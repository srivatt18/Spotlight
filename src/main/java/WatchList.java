package spotlight;

import java.util.*;

public class WatchList {
    private String name;
    private boolean isPublic;
    private Set<String> mediaTitles; // just titles; can expand to full Media objects


    public static final int MIN_LENGTH_name = 2;
    public static final int MAX_LENGTH_name = 20;

    public WatchList(String name, boolean isPublic) {

        this.name = name;
        this.isPublic = isPublic;
        this.mediaTitles = new HashSet<>();
    }


    public static boolean checkNameLength(String name){
        if(MIN_LENGTH_name <= name.length()  &&  name.length() <= MAX_LENGTH_name){
            return true;
        }else{
            return false;
        }
    }

    public static String createWatchList(String name, boolean isPublic){
        if(name == null || name.isEmpty()){
            return "Title is empty";
        }

        if (!checkNameLength(name)) {
            return "Title is too short or too long";
        }

//       for (char c : name.toCharArray()) {
//           if (!Character.isLetter(c)) {
//               return "Title contains special characters, can only have letters";
//           }
//           if (Character.isDigit(c)) {
//               return "Title contains numbers, can only have letters";
//           }
//       }

        if(!checkNameForValidCharacters(name)){
            return "Title has special characters or number";
        }

        WatchList wl = new WatchList(name, isPublic);

        return "Watchlist created";
    }

    public static boolean checkNameForValidCharacters(String name) {
        //returns false in the following cases :
        //      if incoming String has one or more space or control characters
        //      if incoming String does not have at least of the following : one letter or number or  special character
        //return true otherwise
        boolean foundLetter = false;
        boolean foundNumber = false;
        boolean foundSpecialChar = false;
        for (char c : name.toCharArray()) {
            if (Character.isLetter(c)) {
                foundLetter = true;
            } else if (Character.isDigit(c)) {
                return false;
            } else {
                return false;
            }
        }
        //checked all characters in the incoming string
        return( foundLetter);
    }




    public boolean addToWatchlist(String title) {
        return mediaTitles.add(title);
    }

    public boolean removeFromWatchlist(String title) {
        return mediaTitles.remove(title);
    }

    public Set<String> getMediaTitles() {
        return mediaTitles;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    public String getName() {
        return name;
    }
}
