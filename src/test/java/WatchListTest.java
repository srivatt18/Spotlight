import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;


class WatchListTest {
    //

    private WatchList watchL = new WatchList("TestList", true);

    @Test
    void create_TC1() {
        //all values valid
        assertEquals("Watchlist created", watchL.createWatchList("MARRYPOPPINS", true));
    }

    @Test
    void create_TC3() {
        //has special characters
        assertEquals("Title has special characters or number", watchL.createWatchList("GARFIELD!!", true));
    }

    @Test
    void create_TC4() {
        assertEquals("Title is empty", watchL.createWatchList("", false));
    }


    @Test
    void create_TC5() {
        assertEquals( "Title is too short or too long", watchL.createWatchList("U", true));
    }

}