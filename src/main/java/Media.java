public class Media {
    private String title;
    private Genre genre;
    private double averageRating;
    private String type;
    private String rating;
    private String language;
    private int recentViewCount; // Last week

    public Media(String title, Genre genre, double averageRating, String type, String rating, String language) {
        this.title = title;
        this.genre = genre;
        this.averageRating = averageRating;
        this.type = type;
        this.rating = rating;
        this.language = language;
    }

    public String getTitle() { return title; }
    public Genre getGenre() { return genre; }
    public double getAverageRating() { return averageRating; }
    public String getType() { return type; }
    public String getRating() { return rating; }
    public String getLanguage() { return language; }
    public int getRecentViewCount() {return recentViewCount; }

    public void setAverageRating(double newRating) {
        this.averageRating = newRating;
    }
}