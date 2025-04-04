public class Media {
    private String title;
    private String genre;
    private double averageRating;
    private String type;
    private String rating;
    private String language;

    public Media(String title, String genre, double averageRating, String type, String rating, String language) {
        this.title = title;
        this.genre = genre;
        this.averageRating = averageRating;
        this.type = type;
        this.rating = rating;
        this.language = language;
    }

    public String getTitle() { return title; }
    public String getGenre() { return genre; }
    public double getAverageRating() { return averageRating; }
    public String getType() { return type; }
    public String getRating() { return rating; }
    public String getLanguage() { return language; }

    public void setAverageRating(double newRating) {
        this.averageRating = newRating;
    }
}
