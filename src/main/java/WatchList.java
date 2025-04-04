package src.main.java;

import java.util.*;

public class WatchList {
    private String name;
    private boolean isPublic;
    private Set<String> mediaTitles; // just titles; can expand to full Media objects

    public WatchList(String name, boolean isPublic) {
        this.name = name;
        this.isPublic = isPublic;
        this.mediaTitles = new HashSet<>();
    }

    public boolean addToWatchlist(String title) {
        return mediaTitles.add(title);
    }

    public boolean removeFromWatchlist(String title) {
        return mediaTitles.remove(title);
    }

    public Set<String> getMediaTitles() {
        return mediaTitles;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    public String getName() {
        return name;
    }
}
