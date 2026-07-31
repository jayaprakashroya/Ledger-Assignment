package com.example.musiccatalog.dto;

import java.util.List;

public class AnalyticsDTO {

    private long totalAlbums;
    private double averageRating;
    private double averagePrice;
    private String topArtist;
    private String topGenre;
    private List<GenreCountDTO> genres;
    private List<YearCountDTO> releasesByYear;
    private List<RatingCountDTO> ratings;
    private List<TrackBucketDTO> trackCounts;

    public AnalyticsDTO() {
    }

    public static AnalyticsDTOBuilder builder() {
        return new AnalyticsDTOBuilder();
    }

    public long getTotalAlbums() {
        return totalAlbums;
    }

    public void setTotalAlbums(long totalAlbums) {
        this.totalAlbums = totalAlbums;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public double getAveragePrice() {
        return averagePrice;
    }

    public void setAveragePrice(double averagePrice) {
        this.averagePrice = averagePrice;
    }

    public String getTopArtist() {
        return topArtist;
    }

    public void setTopArtist(String topArtist) {
        this.topArtist = topArtist;
    }

    public String getTopGenre() {
        return topGenre;
    }

    public void setTopGenre(String topGenre) {
        this.topGenre = topGenre;
    }

    public List<GenreCountDTO> getGenres() {
        return genres;
    }

    public void setGenres(List<GenreCountDTO> genres) {
        this.genres = genres;
    }

    public List<YearCountDTO> getReleasesByYear() {
        return releasesByYear;
    }

    public void setReleasesByYear(List<YearCountDTO> releasesByYear) {
        this.releasesByYear = releasesByYear;
    }

    public List<RatingCountDTO> getRatings() {
        return ratings;
    }

    public void setRatings(List<RatingCountDTO> ratings) {
        this.ratings = ratings;
    }

    public List<TrackBucketDTO> getTrackCounts() {
        return trackCounts;
    }

    public void setTrackCounts(List<TrackBucketDTO> trackCounts) {
        this.trackCounts = trackCounts;
    }

    public static class GenreCountDTO {
        private String name;
        private long count;

        public GenreCountDTO() {
        }

        public static GenreCountDTOBuilder builder() {
            return new GenreCountDTOBuilder();
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public long getCount() {
            return count;
        }

        public void setCount(long count) {
            this.count = count;
        }
    }

    public static class YearCountDTO {
        private String year;
        private long count;

        public YearCountDTO() {
        }

        public static YearCountDTOBuilder builder() {
            return new YearCountDTOBuilder();
        }

        public String getYear() {
            return year;
        }

        public void setYear(String year) {
            this.year = year;
        }

        public long getCount() {
            return count;
        }

        public void setCount(long count) {
            this.count = count;
        }
    }

    public static class RatingCountDTO {
        private String name;
        private long count;

        public RatingCountDTO() {
        }

        public static RatingCountDTOBuilder builder() {
            return new RatingCountDTOBuilder();
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public long getCount() {
            return count;
        }

        public void setCount(long count) {
            this.count = count;
        }
    }

    public static class TrackBucketDTO {
        private String bucket;
        private long count;

        public TrackBucketDTO() {
        }

        public static TrackBucketDTOBuilder builder() {
            return new TrackBucketDTOBuilder();
        }

        public String getBucket() {
            return bucket;
        }

        public void setBucket(String bucket) {
            this.bucket = bucket;
        }

        public long getCount() {
            return count;
        }

        public void setCount(long count) {
            this.count = count;
        }
    }

    public static class AnalyticsDTOBuilder {
        private final AnalyticsDTO instance = new AnalyticsDTO();

        public AnalyticsDTOBuilder totalAlbums(long totalAlbums) { instance.setTotalAlbums(totalAlbums); return this; }
        public AnalyticsDTOBuilder averageRating(double averageRating) { instance.setAverageRating(averageRating); return this; }
        public AnalyticsDTOBuilder averagePrice(double averagePrice) { instance.setAveragePrice(averagePrice); return this; }
        public AnalyticsDTOBuilder topArtist(String topArtist) { instance.setTopArtist(topArtist); return this; }
        public AnalyticsDTOBuilder topGenre(String topGenre) { instance.setTopGenre(topGenre); return this; }
        public AnalyticsDTOBuilder genres(List<GenreCountDTO> genres) { instance.setGenres(genres); return this; }
        public AnalyticsDTOBuilder releasesByYear(List<YearCountDTO> releasesByYear) { instance.setReleasesByYear(releasesByYear); return this; }
        public AnalyticsDTOBuilder ratings(List<RatingCountDTO> ratings) { instance.setRatings(ratings); return this; }
        public AnalyticsDTOBuilder trackCounts(List<TrackBucketDTO> trackCounts) { instance.setTrackCounts(trackCounts); return this; }
        public AnalyticsDTO build() { return instance; }
    }

    public static class GenreCountDTOBuilder {
        private final GenreCountDTO instance = new GenreCountDTO();
        public GenreCountDTOBuilder name(String name) { instance.setName(name); return this; }
        public GenreCountDTOBuilder count(long count) { instance.setCount(count); return this; }
        public GenreCountDTO build() { return instance; }
    }

    public static class YearCountDTOBuilder {
        private final YearCountDTO instance = new YearCountDTO();
        public YearCountDTOBuilder year(String year) { instance.setYear(year); return this; }
        public YearCountDTOBuilder count(long count) { instance.setCount(count); return this; }
        public YearCountDTO build() { return instance; }
    }

    public static class RatingCountDTOBuilder {
        private final RatingCountDTO instance = new RatingCountDTO();
        public RatingCountDTOBuilder name(String name) { instance.setName(name); return this; }
        public RatingCountDTOBuilder count(long count) { instance.setCount(count); return this; }
        public RatingCountDTO build() { return instance; }
    }

    public static class TrackBucketDTOBuilder {
        private final TrackBucketDTO instance = new TrackBucketDTO();
        public TrackBucketDTOBuilder bucket(String bucket) { instance.setBucket(bucket); return this; }
        public TrackBucketDTOBuilder count(long count) { instance.setCount(count); return this; }
        public TrackBucketDTO build() { return instance; }
    }
}
