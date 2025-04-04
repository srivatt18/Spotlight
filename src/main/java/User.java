import java.io.Serializable;
import java.util.*;

// A client side representation of a user
class User implements Serializable {
    int id;
    String name;
    String email;
    String password; // Hashed and salted
    Date age;
    boolean loggedIn;

    List<Genre> preferredGenres;
    List<Media> watchHistory;

    User(int id, String name, String email, String hashed_password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = hashed_password;
        this.age = new Date();
        this.loggedIn = false;
    }

    List<Genre> getPreferredGenres() {
        return preferredGenres;
    }

    List<Media> getWatchHistory() {
        return watchHistory;
    }

    String getHashedPassword() {
        return password;
    }
}