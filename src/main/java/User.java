package src.main.java;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

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

    User(int id, String name, String email, Date age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
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