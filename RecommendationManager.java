import java.util.List;

class RecommendationManager {
    List<Media> currentlyTrending;
    DBMgr database;
    RecommendationManager(DBMgr database) {
        this.database = database;
    }

    List<Media> getRecommendations(User u) {
        List<Media> results;
        // Syntax might not work
        List<Genre> preferred = database.getUser().preferredCategories();
        results.addAll(database.getMedia().filter(preferred /* Of the genres that the user likes */).sort(/* By highest view count this week */).select(5));
    }
}