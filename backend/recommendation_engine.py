# Test with (windows)
# curl -v http://localhost:5000/recommend -H "Content-Type: application/json" -d "{\"ratings\":[{\"movie\":\"Interstellar\",\"rating\":50},{\"movie\":\"Frozen II\",\"rating\":100}]}"

import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

import random
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import warnings
warnings.filterwarnings("ignore")

# Step 2: Load your CSV from Google Drive
csv_path = "./imdb_movies.json"  # Update path
df = pd.read_json(csv_path).dropna(subset=['overview'])

# Step 4: Compute TF-IDF matrix and cosine similarity
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(df['overview'])

cosine_sim = cosine_similarity(tfidf_matrix)

# Map movie titles to DataFrame indices
indices = pd.Series(df.index, index=df['names']).drop_duplicates()

def get_personalized_recommendations(user_ratings: dict, top_n=5):
    user_indices = []
    rating_weights = []

    for movie, rating in user_ratings.items():
        if movie in indices:
            idx = indices[movie]
            user_indices.append(idx)
            rating_weights.append(rating / 100)  # Normalize rating out of 100

    if not user_indices:
        return []

    # Normalize user ratings for weighted profile
    rating_weights = np.array(rating_weights)
    rating_weights = rating_weights / rating_weights.sum()

    # Create weighted user profile
    user_profile = np.average(tfidf_matrix[user_indices].toarray(), axis=0, weights=rating_weights)
    similarities = cosine_similarity([user_profile], tfidf_matrix).flatten()

    # Exclude watched movies
    for idx in user_indices:
        similarities[idx] = -1

    # Sort and get top 30 similar movies
    top_indices = similarities.argsort()[::-1]
    top_30 = [i for i in top_indices if df['names'].iloc[i] not in user_ratings][:30]

    # Shuffle top results for regenerate behavior
    random.shuffle(top_30)

    # Pick top_n unique recommendations
    unique_recommendations = []
    seen = set(user_ratings.keys())

    for idx in top_30:
        title = df['names'].iloc[idx]
        if title not in seen and title not in unique_recommendations:
            unique_recommendations.append(title)
        if len(unique_recommendations) >= top_n:
            break

    return unique_recommendations

app = Flask(__name__)
CORS(app)

# API route for recommendations
@app.route('/', methods=['POST'])
def get_recommendations():
    print(request)
    data = request.get_json()
    user_ratings = data.get("ratings", {})
    ratings_map = {entry["movie"]: entry["rating"] for entry in user_ratings}
    recommendations =  get_personalized_recommendations(ratings_map)
    return jsonify({"recommendations": recommendations, "length": len(recommendations)})

if __name__ == "__main__":
    app.run(debug=False, port=5000)