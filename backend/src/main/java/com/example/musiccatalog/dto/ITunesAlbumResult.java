package com.example.musiccatalog.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ITunesAlbumResult {

    @JsonProperty("collectionId")
    private Long collectionId;

    @JsonProperty("collectionName")
    private String collectionName;

    @JsonProperty("artistName")
    private String artistName;

    @JsonProperty("releaseDate")
    private String releaseDate;

    @JsonProperty("trackCount")
    private Integer trackCount;

    @JsonProperty("primaryGenreName")
    private String primaryGenreName;

    @JsonProperty("collectionPrice")
    private Double collectionPrice;

    @JsonProperty("artworkUrl100")
    private String artworkUrl100;

    @JsonProperty("artworkUrl600")
    private String artworkUrl600;

    public ITunesAlbumResult() {
    }

    public static ITunesAlbumResultBuilder builder() { return new ITunesAlbumResultBuilder(); }

    public Long getCollectionId() { return collectionId; }
    public void setCollectionId(Long collectionId) { this.collectionId = collectionId; }
    public String getCollectionName() { return collectionName; }
    public void setCollectionName(String collectionName) { this.collectionName = collectionName; }
    public String getArtistName() { return artistName; }
    public void setArtistName(String artistName) { this.artistName = artistName; }
    public String getReleaseDate() { return releaseDate; }
    public void setReleaseDate(String releaseDate) { this.releaseDate = releaseDate; }
    public Integer getTrackCount() { return trackCount; }
    public void setTrackCount(Integer trackCount) { this.trackCount = trackCount; }
    public String getPrimaryGenreName() { return primaryGenreName; }
    public void setPrimaryGenreName(String primaryGenreName) { this.primaryGenreName = primaryGenreName; }
    public Double getCollectionPrice() { return collectionPrice; }
    public void setCollectionPrice(Double collectionPrice) { this.collectionPrice = collectionPrice; }
    public String getArtworkUrl100() { return artworkUrl100; }
    public void setArtworkUrl100(String artworkUrl100) { this.artworkUrl100 = artworkUrl100; }
    public String getArtworkUrl600() { return artworkUrl600; }
    public void setArtworkUrl600(String artworkUrl600) { this.artworkUrl600 = artworkUrl600; }

    public static class ITunesAlbumResultBuilder {
        private final ITunesAlbumResult instance = new ITunesAlbumResult();
        public ITunesAlbumResultBuilder collectionId(Long collectionId) { instance.setCollectionId(collectionId); return this; }
        public ITunesAlbumResultBuilder collectionName(String collectionName) { instance.setCollectionName(collectionName); return this; }
        public ITunesAlbumResultBuilder artistName(String artistName) { instance.setArtistName(artistName); return this; }
        public ITunesAlbumResultBuilder releaseDate(String releaseDate) { instance.setReleaseDate(releaseDate); return this; }
        public ITunesAlbumResultBuilder trackCount(Integer trackCount) { instance.setTrackCount(trackCount); return this; }
        public ITunesAlbumResultBuilder primaryGenreName(String primaryGenreName) { instance.setPrimaryGenreName(primaryGenreName); return this; }
        public ITunesAlbumResultBuilder collectionPrice(Double collectionPrice) { instance.setCollectionPrice(collectionPrice); return this; }
        public ITunesAlbumResultBuilder artworkUrl100(String artworkUrl100) { instance.setArtworkUrl100(artworkUrl100); return this; }
        public ITunesAlbumResultBuilder artworkUrl600(String artworkUrl600) { instance.setArtworkUrl600(artworkUrl600); return this; }
        public ITunesAlbumResult build() { return instance; }
    }
}
