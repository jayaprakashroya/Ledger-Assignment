package com.example.musiccatalog.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class CreateAlbumRequest {

    @NotNull(message = "Apple catalog ID is required")
    @JsonProperty("apple_catalog_id")
    private Long appleCatalogId;

    @NotBlank(message = "Album title is required")
    private String title;

    @NotBlank(message = "Artist name is required")
    @JsonProperty("artist_name")
    private String artistName;

    private String genre;

    @JsonProperty("release_date")
    private LocalDate releaseDate;

    @JsonProperty("track_count")
    private Integer trackCount;

    @JsonProperty("artwork_url")
    private String artworkUrl;

    private Double price;

    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    @JsonProperty("user_rating")
    private Integer userRating;

    @JsonProperty("user_notes")
    private String userNotes;

    public CreateAlbumRequest() {
    }

    public static CreateAlbumRequestBuilder builder() { return new CreateAlbumRequestBuilder(); }

    public Long getAppleCatalogId() { return appleCatalogId; }
    public void setAppleCatalogId(Long appleCatalogId) { this.appleCatalogId = appleCatalogId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getArtistName() { return artistName; }
    public void setArtistName(String artistName) { this.artistName = artistName; }
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
    public LocalDate getReleaseDate() { return releaseDate; }
    public void setReleaseDate(LocalDate releaseDate) { this.releaseDate = releaseDate; }
    public Integer getTrackCount() { return trackCount; }
    public void setTrackCount(Integer trackCount) { this.trackCount = trackCount; }
    public String getArtworkUrl() { return artworkUrl; }
    public void setArtworkUrl(String artworkUrl) { this.artworkUrl = artworkUrl; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Integer getUserRating() { return userRating; }
    public void setUserRating(Integer userRating) { this.userRating = userRating; }
    public String getUserNotes() { return userNotes; }
    public void setUserNotes(String userNotes) { this.userNotes = userNotes; }

    public static class CreateAlbumRequestBuilder {
        private final CreateAlbumRequest instance = new CreateAlbumRequest();
        public CreateAlbumRequestBuilder appleCatalogId(Long appleCatalogId) { instance.setAppleCatalogId(appleCatalogId); return this; }
        public CreateAlbumRequestBuilder title(String title) { instance.setTitle(title); return this; }
        public CreateAlbumRequestBuilder artistName(String artistName) { instance.setArtistName(artistName); return this; }
        public CreateAlbumRequestBuilder genre(String genre) { instance.setGenre(genre); return this; }
        public CreateAlbumRequestBuilder releaseDate(LocalDate releaseDate) { instance.setReleaseDate(releaseDate); return this; }
        public CreateAlbumRequestBuilder trackCount(Integer trackCount) { instance.setTrackCount(trackCount); return this; }
        public CreateAlbumRequestBuilder artworkUrl(String artworkUrl) { instance.setArtworkUrl(artworkUrl); return this; }
        public CreateAlbumRequestBuilder price(Double price) { instance.setPrice(price); return this; }
        public CreateAlbumRequestBuilder userRating(Integer userRating) { instance.setUserRating(userRating); return this; }
        public CreateAlbumRequestBuilder userNotes(String userNotes) { instance.setUserNotes(userNotes); return this; }
        public CreateAlbumRequest build() { return instance; }
    }
}
