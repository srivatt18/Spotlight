import java.util.*;
import java.util.stream.Collectors;

class RecommendationManager {
    List<Media> currentlyTrending;
    DBMgr database;
    RecommendationManager(DBMgr database) {
        this.database = database;
    }

    List<Media> getRecommendations(User u) {
        List<Media> results = new ArrayList<>();
        // Syntax might not work
        List<Genre> preferred = u.getPreferredGenres();
        results.addAll(
            database
                .getAllMedia()
                .stream()
                .filter((Media m) -> preferred.contains(m.getGenre()))
                .sorted(Comparator.comparingInt(Media::getRecentViewCount))
                .toList());

        return results;
    }
}