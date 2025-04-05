package spotlight;

import java.util.*;
import java.util.regex.Pattern;

import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;

public class UserManager {
    // DBMgr database;

    private static Pattern emailRegex = Pattern.compile("^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$");
    private static Pattern usernameRegex = Pattern.compile("^[a-z0-9_-]{3,15}$");
    private static Pattern passwordRegex = Pattern.compile("^[a-z0-9_-]{3,15}$");

    public static final int MIN_LENGTH_PWD = 8;
    public static final int MAX_LENGTH_PWD = 12;

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

    public UserManager(DBMgr database) {
        // Salt size
        // Hash size
        // Memory size
        // Iterations
        encoder = new Argon2PasswordEncoder(16, 32, 2, 10 * 24, 1000);
        this.database = database;
    }

    public static boolean checkPwdLength(String pwd){
        if(MIN_LENGTH_PWD <= pwd.length()  &&  pwd.length() <= MAX_LENGTH_PWD){
            return true;
        }else{
            return false;
        }
    }

    public static boolean checkPwdForValidCharacters(String pwd) {
        //returns false in the following cases :
        //      if incoming String has one or more space or control characters
        //      if incoming String does not have at least of the following : one letter or number or  special character
        //return true otherwise
        boolean foundLetter = false;
        boolean foundNumber = false;
        boolean foundSpecialChar = false;
        for (char c : pwd.toCharArray()) {
            if (Character.isISOControl(c) || Character.isSpaceChar(c)) {
                return false;
            } else if (Character.isLetter(c)) {
                foundLetter = true;
            } else if (Character.isDigit(c)) {
                foundNumber = true;
            } else {
                foundSpecialChar = true;
            }
        }
        //checked all characters in the incoming string
        return( foundLetter && foundNumber && foundSpecialChar );
    }

    public static boolean checkPwd1Pwd2(String pwd1, String pwd2){
        if( pwd1.equals(pwd2) ){
            return true;
        }else{
            return false;
        }
    }

    public String createUser(String username, String email, String password, String confirmPassword) {
            if (!database.emailFree(email)) {
                return "Email already in use";
            }

            if( !checkPwdLength( password ) ){
                return "Password must be within 8-12 characters";
            }
            if( !checkPwdForValidCharacters( password ) ){
                return "Password must have at least one letter, one number, and one special character with no spaces or control characters";
            }
            if( !checkPwd1Pwd2( password, confirmPassword ) ){
                return "Retyped password does not match the entered password";
            }

            User u = new User(database.getFreeID(), username, email, encoder.encode(password));
            database.addUser(u);

            return "Account created successfully";
    }

    public String logIn(String email, String password) {
        User u = database.getUserFromEmail(email);
        if(u == null){
            return "User not found";
        }
        String hash = u.getHashedPassword();
        if( encoder.matches(password, hash)) {
            u.setLoggedIn(true);
            return "User logged in successfully";
        }
        return "Login failed";
    }

    public String logOut(User u) {
       if(u.isLoggedIn()){
           u.setLoggedIn(false);
           return "User logged out successfully";
       }
       return "user not logged in";
    }
    public User getUserFromID(int id) {
        return database.getUsers().stream().filter(user -> user.id == id).findFirst().get();
    }

    public String logOut(String email){
        return logOut(database.getUserFromEmail(email));
    }

    public List<Media> getWatchHistory(User u) {
        return u.getWatchHistory();
    }
}