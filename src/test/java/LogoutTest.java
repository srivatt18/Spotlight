import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import spotlight.UserManager;
import spotlight.DBMgr;


public class LogoutTest {
    private final spotlight.DBMgr database = new spotlight.DBMgr();
    private final spotlight.UserManager userManager = new spotlight.UserManager(database);

    @Test
    void testLogout() {
        userManager.createUser("xft123%PLM", "user@gmail.com",  "xft123%PLM", "xft123%PLM");
        //all values valid
        userManager.logIn("user@gmail.com", "xft123%PLM");
        assertEquals( "User logged out successfully", userManager.logOut("user@gmail.com")  );

    }
}
