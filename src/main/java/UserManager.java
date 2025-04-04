package src.main.java;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;

class UserManager {
    // DBMgr database;

    private static Pattern emailRegex = Pattern.compile("^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$");
    private static Pattern usernameRegex = Pattern.compile("^[a-z0-9_-]{3,15}$");
    private static Pattern passwordRegex = Pattern.compile("^[a-z0-9_-]{3,15}$");

    public static boolean validate(String email, String username, String password) {
        return validateEmail(email) && validateUsername(username) && validatePassword(password);
    }

    public static boolean validateEmail(String email) {
        return emailRegex.matcher(email).matches();
    }

    public static boolean validateUsername(String username) {
        return usernameRegex.matcher(username).matches();
    }

    public static boolean validatePassword(String password) {
        return passwordRegex.matcher(password).matches();
    }

    DBMgr database;
    List<Integer> loggedIn;
    Argon2PasswordEncoder encoder;

    UserManager(DBMgr database) {
        // Salt size
        // Hash size
        // Memory size
        // Iterations
        encoder = new Argon2PasswordEncoder(16, 32, 2, 10 * 24, 1000);
        this.database = database;
    }
    
    public boolean logIn(String email, String password) {
        String hash = database.getUserFromEmail(email).getHashedPassword();
        return encoder.matches(password, hash);
    }

    public User getUserFromID(int id) {
        return database.getUsers().stream().filter(user -> user.id == id).findFirst().get();
    }

    public List<Media> getWatchHistory(User u) {
        return u.getWatchHistory();
    }
}