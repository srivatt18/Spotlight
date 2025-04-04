package src.main.java;

import java.util.ArrayList;
import java.util.List;

public class DBMgr {
    private ArrayList<Media> mediaList;
    private ArrayList<User> users;

    public DBMgr() {
        mediaList = new ArrayList<>();
        users = new ArrayList<>();
    }

    public List<User> getUsers() {
        return users;
    }

    // Can return null for a missing id
    public User getUser(int id) {
        for (User user : users) {
            if (user.id == id) {
                return user;
            }
        }

        return null;
    }

    public User getUserFromEmail(String email) {
        for (User user : users) {
            if (user.email == email) {
                return user;
            }
        }

        return null;
    }

    public boolean addMedia(Media media) {
        for (Media m : mediaList) {
            if (m.getTitle().equalsIgnoreCase(media.getTitle()))
                return false;
        }
        mediaList.add(media);
        return true;
    }

    public boolean deleteMedia(String title) {
        return mediaList.removeIf(m -> m.getTitle().equalsIgnoreCase(title));
    }

    public Media getMedia(String title) {
        for (Media m : mediaList) {
            if (m.getTitle().equalsIgnoreCase(title))
                return m;
        }
        return null;
    }

    public ArrayList<Media> getAllMedia() {
        return mediaList;
    }
}
