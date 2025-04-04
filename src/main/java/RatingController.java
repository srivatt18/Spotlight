import java.util.HashMap;

public class RatingController {
    private HashMap<String, Double> userRatings;

    public RatingController() {
        userRatings = new HashMap<>();
    }

    public String addRating(String title, double rating) {
        if (rating < 0 || rating > 5) return "Rating must be between 0 and 5 stars.";
        userRatings.put(title, rating);
        return "Rating added for " + title;
    }

    public String updateRating(String title, double newRating) {
        if (!userRatings.containsKey(title)) return "No existing rating to update.";
        return addRating(title, newRating);
    }

    public String deleteRating(String title) {
        if (userRatings.containsKey(title)) {
            userRatings.remove(title);
            return "Rating deleted for " + title;
        } else {
            return "No rating found for " + title;
        }
    }

    public double getRating(String title) {
        return userRatings.getOrDefault(title, -1.0);
    }

    public HashMap<String, Double> getAllRatings() {
        return userRatings;
    }
}
