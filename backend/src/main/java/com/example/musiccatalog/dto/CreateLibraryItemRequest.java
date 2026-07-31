package com.example.musiccatalog.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class CreateLibraryItemRequest {

    @NotNull(message = "Apple catalog ID is required")
    @JsonProperty("apple_catalog_id")
    private Long appleCatalogId;

    @NotBlank(message = "Title is required")
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

    @JsonProperty("collection_price")
    private Double collectionPrice;

    @JsonProperty("user_rating")
    private Integer userRating;

    @JsonProperty("user_notes")
    private String userNotes;

    public CreateLibraryItemRequest() {
    }

    public static CreateLibraryItemRequestBuilder builder() {
        return new CreateLibraryItemRequestBuilder();
    }

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
    public Double getCollectionPrice() { return collectionPrice; }
    public void setCollectionPrice(Double collectionPrice) { this.collectionPrice = collectionPrice; }
    public Integer getUserRating() { return userRating; }
    public void setUserRating(Integer userRating) { this.userRating = userRating; }
    public String getUserNotes() { return userNotes; }
    public void setUserNotes(String userNotes) { this.userNotes = userNotes; }

    public static class CreateLibraryItemRequestBuilder {
        private final CreateLibraryItemRequest instance = new CreateLibraryItemRequest();
        public CreateLibraryItemRequestBuilder appleCatalogId(Long appleCatalogId) { instance.setAppleCatalogId(appleCatalogId); return this; }
        public CreateLibraryItemRequestBuilder title(String title) { instance.setTitle(title); return this; }
        public CreateLibraryItemRequestBuilder artistName(String artistName) { instance.setArtistName(artistName); return this; }
        public CreateLibraryItemRequestBuilder genre(String genre) { instance.setGenre(genre); return this; }
        public CreateLibraryItemRequestBuilder releaseDate(LocalDate releaseDate) { instance.setReleaseDate(releaseDate); return this; }
        public CreateLibraryItemRequestBuilder trackCount(Integer trackCount) { instance.setTrackCount(trackCount); return this; }
        public CreateLibraryItemRequestBuilder artworkUrl(String artworkUrl) { instance.setArtworkUrl(artworkUrl); return this; }
        public CreateLibraryItemRequestBuilder collectionPrice(Double collectionPrice) { instance.setCollectionPrice(collectionPrice); return this; }
        public CreateLibraryItemRequestBuilder userRating(Integer userRating) { instance.setUserRating(userRating); return this; }
        public CreateLibraryItemRequestBuilder userNotes(String userNotes) { instance.setUserNotes(userNotes); return this; }
        public CreateLibraryItemRequest build() { return instance; }
    }
}
