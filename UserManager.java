import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

class UserManager {
    // DBMgr database;
    
    private static Pattern emailRegex = Pattern.compile("^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$");
    private static Pattern usernameRegex = Pattern.compile("^[a-z0-9_-]{3,15}$");
    private static Pattern passwordRegex =  Pattern.compile("^[a-z0-9_-]{3,15}$");

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

    public static void main(String[] args) {
        System.out.println(validateEmail("fff"));
        System.out.println(validateEmail("f.ccom@gmail.com"));
        System.out.println(validateEmail("aga@gmail.a"));
        System.out.println(validateEmail("@gmail.com"));
        System.out.println(validateEmail("a@kk.com"));
        System.out.println(validateEmail("@gga"));
    }

    UserManager(DBMgr database) {
        this.database = database;
    }

    public User getUserFromID(int id) {
        return database.getUsers().stream().filter(user -> user.id == id).collect(Collectors.toList());
    }

    public List<Media> getWatchHistory(User u) {
        return database.getUser(u).getWatchHistory();
    }
}