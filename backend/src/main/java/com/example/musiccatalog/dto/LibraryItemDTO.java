package com.example.musiccatalog.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public class LibraryItemDTO {
    private UUID id;

    @JsonProperty("apple_catalog_id")
    private Long appleCatalogId;

    private String title;

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

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

    public LibraryItemDTO() {
    }

    public static LibraryItemDTOBuilder builder() {
        return new LibraryItemDTOBuilder();
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
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
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static class LibraryItemDTOBuilder {
        private final LibraryItemDTO instance = new LibraryItemDTO();
        public LibraryItemDTOBuilder id(UUID id) { instance.setId(id); return this; }
        public LibraryItemDTOBuilder appleCatalogId(Long appleCatalogId) { instance.setAppleCatalogId(appleCatalogId); return this; }
        public LibraryItemDTOBuilder title(String title) { instance.setTitle(title); return this; }
        public LibraryItemDTOBuilder artistName(String artistName) { instance.setArtistName(artistName); return this; }
        public LibraryItemDTOBuilder genre(String genre) { instance.setGenre(genre); return this; }
        public LibraryItemDTOBuilder releaseDate(LocalDate releaseDate) { instance.setReleaseDate(releaseDate); return this; }
        public LibraryItemDTOBuilder trackCount(Integer trackCount) { instance.setTrackCount(trackCount); return this; }
        public LibraryItemDTOBuilder artworkUrl(String artworkUrl) { instance.setArtworkUrl(artworkUrl); return this; }
        public LibraryItemDTOBuilder collectionPrice(Double collectionPrice) { instance.setCollectionPrice(collectionPrice); return this; }
        public LibraryItemDTOBuilder userRating(Integer userRating) { instance.setUserRating(userRating); return this; }
        public LibraryItemDTOBuilder userNotes(String userNotes) { instance.setUserNotes(userNotes); return this; }
        public LibraryItemDTOBuilder createdAt(LocalDateTime createdAt) { instance.setCreatedAt(createdAt); return this; }
        public LibraryItemDTOBuilder updatedAt(LocalDateTime updatedAt) { instance.setUpdatedAt(updatedAt); return this; }
        public LibraryItemDTO build() { return instance; }
    }
}
