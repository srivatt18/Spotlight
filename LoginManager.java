import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;

class LoginManager {
    DBMgr database;
    Argon2PasswordEncoder encoder;

    List<id> loggedIn;

    LoginManager() {
        encoder = new Argon2PasswordEncoder(16, 32, 2, 10 * 24, 1000);
    }

    public boolean logIn(User u, String password) {
        String hash = database.getHashedPassword(u);
        return encoder.matches(password, hash);
    }
}