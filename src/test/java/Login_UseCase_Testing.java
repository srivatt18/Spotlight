import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import spotlight.UserManager;
import spotlight.DBMgr;

public class Login_UseCase_Testing {
    private final DBMgr database = new DBMgr();
    private final UserManager userManager = new UserManager(database);


    @Test
    void login_TC1() {
        userManager.createUser("xft123%PLM", "user@gmail.com",  "xft123%PLM", "xft123%PLM");
        //all values valid
        assertEquals( "User logged in successfully", userManager.logIn("user@gmail.com", "xft123%PLM")  );
    }

    @Test
    void login_TC2() {
        //retyped does not match
        assertEquals( "User not found", userManager.logIn("lovergirl@gmail.com", "xft123%PLM")  );

    }

    @Test
    void login_TC3() {
        userManager.createUser("dft123%PLM", "usernew@hmail.com",  "xft123%PLM", "xft123%PLM");
        //pwd length is  8 but does not satisfy rules
        assertEquals( "Login failed", userManager.logIn("usernew@hmail.com", "yyyyyyyy")  );
    }
}
