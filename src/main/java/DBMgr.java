package spotlight;

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

    public void addUser(User u) {
        users.add(u);
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
            if (user.email.equals(email)) { // Fixed comparison to use .equals() for string
                return user;
            }
        }
        return null;
    }

    public boolean addMedia(Media media) {
        for (Media m : mediaList) {
            if (m.getTitle().equalsIgnoreCase(media.getTitle())) {
                return false;
            }
        }
        mediaList.add(media);
        return true;
    }

    public boolean deleteMedia(String title) {
        return mediaList.removeIf(m -> m.getTitle().equalsIgnoreCase(title));
    }

    public Media getMedia(String title) {
        for (Media m : mediaList) {
            if (m.getTitle().equalsIgnoreCase(title)) {
                return m;
            }
        }
        return null;
    }

    public ArrayList<Media> getAllMedia() {
        return mediaList;
    }

    public boolean emailFree(String email) {
        return users.stream().noneMatch((user) -> user.email.equals(email));
    }

    // Method to get the next free ID for users
    public int getFreeID() {
        int nextId = 1;

        // Find the next available user ID
        for (User user : users) {
            if (user.id >= nextId) {
                nextId = user.id + 1;
            }
        }

        return nextId;
    }
}