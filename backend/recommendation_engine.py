import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

print(os.path.dirname(os.path.abspath(__file__)))
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Load the movie data
json_path = "../assets/movies.json"
df = pd.read_json(json_path)

# Clean and prepare data
df = df.dropna(subset=['overview'])
df['overview'] = df['overview'].apply(lambda x: x.replace('\u00a0', ' ').replace('\u2014', '—'))

# Compute TF-IDF matrix
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(df['overview'])

# Map movie names to indices
indices = pd.Series(df.index, index=df['names']).drop_duplicates()

def get_personalized_recommendations(user_ratings: dict, top_n=5):
    user_indices = []
    rating_weights = []

    for movie, rating in user_ratings.items():
        if movie in indices:
            idx = indices[movie]
            user_indices.append(idx)
            rating_weights.append(rating / 100)

    if not user_indices:
        return []

    rating_weights = np.array(rating_weights)
    rating_weights = rating_weights / rating_weights.sum()

    # Safely stack TF-IDF vectors
    user_tfidf_vectors = np.vstack([tfidf_matrix[idx].toarray() for idx in user_indices])
    user_profile = np.average(user_tfidf_vectors, axis=0, weights=rating_weights)

    similarities = cosine_similarity([user_profile], tfidf_matrix).flatten()

    for idx in user_indices:
        similarities[idx] = -1

    top_indices = similarities.argsort()[::-1]
    top_30 = [i for i in top_indices if df['names'].iloc[i] not in user_ratings][:30]

    random.shuffle(top_30)

    unique_recommendations = []
    seen = set(user_ratings.keys())

    for idx in top_30:
        title = df['names'].iloc[idx]
        if title not in seen and title not in unique_recommendations:
            unique_recommendations.append(title)
        if len(unique_recommendations) >= top_n:
            break

    return unique_recommendations

# Set up Flask app
app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def get_recommendations():
    data = request.get_json()
    ratings_list = data.get("ratings", [])
    user_ratings = {entry["title"]: entry["rating"] for entry in ratings_list if "title" in entry and "rating" in entry}

    recommendations = get_personalized_recommendations(user_ratings)
    return jsonify({"recommendations": recommendations, "length": len(recommendations)})

if __name__ == "__main__":
    app.run(debug=False, port=5000)