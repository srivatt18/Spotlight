import java.io.Serializable;
import java.util.Date;

// A client side representation of a user
class User implements Serializable {
    int id;
    String name;
    String email;
    Date age;
    boolean loggedIn;

    User(int id, String name, String email, Date age) {
        this.id =id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.loggedIn = false;
    }
}