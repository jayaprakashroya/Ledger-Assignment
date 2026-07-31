package com.example.musiccatalog.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "library_items", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "apple_catalog_id"})
})
public class LibraryItem {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "UUID")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "apple_catalog_id", nullable = false)
    private Long appleCatalogId;

    @NotBlank
    @Column(nullable = false)
    private String title;

    @NotBlank
    @Column(name = "artist_name", nullable = false)
    private String artistName;

    @Column
    private String genre;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "track_count")
    private Integer trackCount;

    @Column(name = "artwork_url")
    private String artworkUrl;

    @Column(name = "collection_price")
    private Double collectionPrice;

    @Column(name = "user_rating")
    private Integer userRating;

    @Column(name = "user_notes", columnDefinition = "TEXT")
    private String userNotes;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    public LibraryItem() {
    }

    public static LibraryItemBuilder builder() {
        return new LibraryItemBuilder();
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
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

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public static class LibraryItemBuilder {
        private final LibraryItem instance = new LibraryItem();
        public LibraryItemBuilder id(UUID id) { instance.setId(id); return this; }
        public LibraryItemBuilder user(User user) { instance.setUser(user); return this; }
        public LibraryItemBuilder appleCatalogId(Long appleCatalogId) { instance.setAppleCatalogId(appleCatalogId); return this; }
        public LibraryItemBuilder title(String title) { instance.setTitle(title); return this; }
        public LibraryItemBuilder artistName(String artistName) { instance.setArtistName(artistName); return this; }
        public LibraryItemBuilder genre(String genre) { instance.setGenre(genre); return this; }
        public LibraryItemBuilder releaseDate(LocalDate releaseDate) { instance.setReleaseDate(releaseDate); return this; }
        public LibraryItemBuilder trackCount(Integer trackCount) { instance.setTrackCount(trackCount); return this; }
        public LibraryItemBuilder artworkUrl(String artworkUrl) { instance.setArtworkUrl(artworkUrl); return this; }
        public LibraryItemBuilder collectionPrice(Double collectionPrice) { instance.setCollectionPrice(collectionPrice); return this; }
        public LibraryItemBuilder userRating(Integer userRating) { instance.setUserRating(userRating); return this; }
        public LibraryItemBuilder userNotes(String userNotes) { instance.setUserNotes(userNotes); return this; }
        public LibraryItemBuilder createdAt(LocalDateTime createdAt) { instance.setCreatedAt(createdAt); return this; }
        public LibraryItemBuilder updatedAt(LocalDateTime updatedAt) { instance.setUpdatedAt(updatedAt); return this; }
        public LibraryItem build() { return instance; }
    }
}
