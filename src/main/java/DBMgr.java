import java.util.ArrayList;

public class DBMgr {
    private ArrayList<Media> mediaList;

    public DBMgr() {
        mediaList = new ArrayList<>();
    }

    public boolean addMedia(Media media) {
        for (Media m : mediaList) {
            if (m.getTitle().equalsIgnoreCase(media.getTitle())) return false;
        }
        mediaList.add(media);
        return true;
    }

    public boolean deleteMedia(String title) {
        return mediaList.removeIf(m -> m.getTitle().equalsIgnoreCase(title));
    }

    public Media getMedia(String title) {
        for (Media m : mediaList) {
            if (m.getTitle().equalsIgnoreCase(title)) return m;
        }
        return null;
    }

    public ArrayList<Media> getAllMedia() {
        return mediaList;
    }
}
