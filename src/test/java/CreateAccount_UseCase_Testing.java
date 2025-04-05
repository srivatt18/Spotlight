import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import spotlight.UserManager;
import  spotlight.DBMgr;

class CreateAccount_UseCase_Testing {
    //
    private final DBMgr database = new DBMgr();
    private final UserManager userManager = new UserManager(database);
    @Test
    void create_TC1() {
        //all values valid
        assertEquals( "Account created successfully", userManager.createUser("xft123%PLM", "user@gmail.com",  "xft123%PLM", "xft123%PLM"));
    }

    @Test
    void create_TC2() {
        //retyped does not match
        assertEquals( "Retyped password does not match the entered password", userManager.createUser("loverboy", "email@gmail.com",  "xft123%PLM", "Dft123%PLM")  );

    }

    @Test
    void create_TC3() {
        //pwd length is  8 but does not satisfy rules
        assertEquals( "Password must have at least one letter, one number, and one special character with no spaces or control characters", userManager.createUser("star", "usernew@hmail.com", "zzzzzzzz",  "zzzzzzzz")  );
    }
    @Test
    void create_TC5() {
        //pwd length is 1
        assertEquals( "Password must be within 8-12 characters", userManager.createUser("accountOwner", "hello@gmail.com",  "x", "x")  );
        //public static String register(String argLoginID, String argPwd1, String argPwd2){
    }

    @Test
    void create_TC7() {
        //sending an existing user
        userManager.createUser("catlover", "firstuser@gmail.com",  "xft123%PLM", "xft123%PLM");
        assertEquals( "Email already in use", userManager.createUser("catlover", "firstuser@gmail.com",  "xft123%PLM", "xft123%PLM")  );
    }


}