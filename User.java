import java.io.Serializable;
import java.util.Date;

// A client side representation of a user
class User implements Serializable {
    int id;
    String name;
    String email;
    Date age;
    boolean loggedIn;

    public static void main(String[] args) {
        System.out.println("hello!");
    }
}