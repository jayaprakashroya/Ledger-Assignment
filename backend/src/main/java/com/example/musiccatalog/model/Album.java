package com.example.musiccatalog.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Album entity representing a music album in the user's library.
 * This entity is mapped to the albums table in the database.
 */
@Entity
@Table(name = "albums")
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "apple_catalog_id", nullable = false, unique = true)
    private Long appleCatalogId;

    @NotBlank(message = "Album title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Artist name is required")
    @Column(nullable = false)
    private String artistName;

    @Column
    private String genre;

    @Column
    private LocalDate releaseDate;

    @Column
    private Integer trackCount;

    @Column
    private String artworkUrl;

    @Column
    private Double price;

    @Column
    private Integer userRating;

    @Column(columnDefinition = "TEXT")
    private String userNotes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Album() {
    }

    public static AlbumBuilder builder() {
        return new AlbumBuilder();
    }

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
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public static class AlbumBuilder {
        private final Album instance = new Album();
        public AlbumBuilder id(Long id) { instance.setId(id); return this; }
        public AlbumBuilder appleCatalogId(Long appleCatalogId) { instance.setAppleCatalogId(appleCatalogId); return this; }
        public AlbumBuilder title(String title) { instance.setTitle(title); return this; }
        public AlbumBuilder artistName(String artistName) { instance.setArtistName(artistName); return this; }
        public AlbumBuilder genre(String genre) { instance.setGenre(genre); return this; }
        public AlbumBuilder releaseDate(LocalDate releaseDate) { instance.setReleaseDate(releaseDate); return this; }
        public AlbumBuilder trackCount(Integer trackCount) { instance.setTrackCount(trackCount); return this; }
        public AlbumBuilder artworkUrl(String artworkUrl) { instance.setArtworkUrl(artworkUrl); return this; }
        public AlbumBuilder price(Double price) { instance.setPrice(price); return this; }
        public AlbumBuilder userRating(Integer userRating) { instance.setUserRating(userRating); return this; }
        public AlbumBuilder userNotes(String userNotes) { instance.setUserNotes(userNotes); return this; }
        public AlbumBuilder user(User user) { instance.setUser(user); return this; }
        public AlbumBuilder createdAt(LocalDateTime createdAt) { instance.setCreatedAt(createdAt); return this; }
        public AlbumBuilder updatedAt(LocalDateTime updatedAt) { instance.setUpdatedAt(updatedAt); return this; }
        public Album build() { return instance; }
    }
}
