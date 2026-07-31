package com.example.musiccatalog.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Data Transfer Object for Album.
 */
public class AlbumDTO {

    private Long id;

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

    private Double price;

    @JsonProperty("user_rating")
    private Integer userRating;

    @JsonProperty("user_notes")
    private String userNotes;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

    public AlbumDTO() {
    }

    public static AlbumDTOBuilder builder() { return new AlbumDTOBuilder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static class AlbumDTOBuilder {
        private final AlbumDTO instance = new AlbumDTO();
        public AlbumDTOBuilder id(Long id) { instance.setId(id); return this; }
        public AlbumDTOBuilder appleCatalogId(Long appleCatalogId) { instance.setAppleCatalogId(appleCatalogId); return this; }
        public AlbumDTOBuilder title(String title) { instance.setTitle(title); return this; }
        public AlbumDTOBuilder artistName(String artistName) { instance.setArtistName(artistName); return this; }
        public AlbumDTOBuilder genre(String genre) { instance.setGenre(genre); return this; }
        public AlbumDTOBuilder releaseDate(LocalDate releaseDate) { instance.setReleaseDate(releaseDate); return this; }
        public AlbumDTOBuilder trackCount(Integer trackCount) { instance.setTrackCount(trackCount); return this; }
        public AlbumDTOBuilder artworkUrl(String artworkUrl) { instance.setArtworkUrl(artworkUrl); return this; }
        public AlbumDTOBuilder price(Double price) { instance.setPrice(price); return this; }
        public AlbumDTOBuilder userRating(Integer userRating) { instance.setUserRating(userRating); return this; }
        public AlbumDTOBuilder userNotes(String userNotes) { instance.setUserNotes(userNotes); return this; }
        public AlbumDTOBuilder createdAt(LocalDateTime createdAt) { instance.setCreatedAt(createdAt); return this; }
        public AlbumDTOBuilder updatedAt(LocalDateTime updatedAt) { instance.setUpdatedAt(updatedAt); return this; }
        public AlbumDTO build() { return instance; }
    }
}
