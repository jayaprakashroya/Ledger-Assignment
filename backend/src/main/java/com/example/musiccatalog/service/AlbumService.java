package com.example.musiccatalog.service;

import com.example.musiccatalog.dto.AlbumDTO;
import com.example.musiccatalog.dto.AnalyticsDTO;
import com.example.musiccatalog.dto.CreateAlbumRequest;
import com.example.musiccatalog.exception.DuplicateResourceException;
import com.example.musiccatalog.exception.ResourceNotFoundException;
import com.example.musiccatalog.model.Album;
import com.example.musiccatalog.model.User;
import com.example.musiccatalog.repository.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Transactional
public class AlbumService {

    @Autowired
    private AlbumRepository albumRepository;

    public List<AlbumDTO> getLibrary(User user) {
        return albumRepository.findByUser(user).stream()
                .map(this::mapToDto)
                .toList();
    }

    public AlbumDTO createAlbum(CreateAlbumRequest request, User user) {
        if (albumRepository.existsByAppleCatalogIdAndUser(request.getAppleCatalogId(), user)) {
            throw new DuplicateResourceException("Album already exists in your library");
        }

        Album album = Album.builder()
                .appleCatalogId(request.getAppleCatalogId())
                .title(request.getTitle())
                .artistName(request.getArtistName())
                .genre(request.getGenre())
                .releaseDate(request.getReleaseDate())
                .trackCount(request.getTrackCount())
                .artworkUrl(request.getArtworkUrl())
                .price(request.getPrice())
                .userRating(request.getUserRating())
                .userNotes(request.getUserNotes())
                .user(user)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return mapToDto(albumRepository.save(album));
    }

    public AlbumDTO updateAlbum(Long id, CreateAlbumRequest request, User user) {
        Album album = albumRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Album", "id", id));

        album.setTitle(request.getTitle());
        album.setArtistName(request.getArtistName());
        album.setGenre(request.getGenre());
        album.setReleaseDate(request.getReleaseDate());
        album.setTrackCount(request.getTrackCount());
        album.setArtworkUrl(request.getArtworkUrl());
        album.setPrice(request.getPrice());
        album.setUserRating(request.getUserRating());
        album.setUserNotes(request.getUserNotes());
        album.setUpdatedAt(LocalDateTime.now());

        return mapToDto(albumRepository.save(album));
    }

    public void deleteAlbum(Long id, User user) {
        Album album = albumRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Album", "id", id));
        albumRepository.delete(album);
    }

    public AnalyticsDTO getAnalytics(User user) {
        List<Album> albums = albumRepository.findByUser(user);

        Map<String, Long> genres = albums.stream()
                .map(album -> album.getGenre() == null || album.getGenre().isBlank() ? "Unknown" : album.getGenre())
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        Map<String, Long> releasesByYear = albums.stream()
                .filter(album -> album.getReleaseDate() != null)
                .collect(Collectors.groupingBy(album -> String.valueOf(album.getReleaseDate().getYear()), Collectors.counting()));

        Map<String, Long> ratings = albums.stream()
                .map(album -> album.getUserRating() == null ? "Unrated" : String.valueOf(album.getUserRating()))
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        Map<String, Long> trackBuckets = albums.stream()
                .map(album -> bucketTrackCount(album.getTrackCount()))
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        List<AnalyticsDTO.GenreCountDTO> genreCounts = genres.entrySet().stream()
                .map(entry -> AnalyticsDTO.GenreCountDTO.builder().name(entry.getKey()).count(entry.getValue()).build())
                .sorted(Comparator.comparingLong(AnalyticsDTO.GenreCountDTO::getCount).reversed())
                .toList();

        List<AnalyticsDTO.YearCountDTO> releaseYears = releasesByYear.entrySet().stream()
                .map(entry -> AnalyticsDTO.YearCountDTO.builder().year(entry.getKey()).count(entry.getValue()).build())
                .sorted(Comparator.comparing(AnalyticsDTO.YearCountDTO::getYear))
                .toList();

        List<AnalyticsDTO.RatingCountDTO> ratingCounts = ratings.entrySet().stream()
                .map(entry -> AnalyticsDTO.RatingCountDTO.builder().name(entry.getKey()).count(entry.getValue()).build())
                .sorted(Comparator.comparing(AnalyticsDTO.RatingCountDTO::getName))
                .toList();

        List<AnalyticsDTO.TrackBucketDTO> trackCountBuckets = trackBuckets.entrySet().stream()
                .map(entry -> AnalyticsDTO.TrackBucketDTO.builder().bucket(entry.getKey()).count(entry.getValue()).build())
                .sorted(Comparator.comparing(AnalyticsDTO.TrackBucketDTO::getBucket))
                .toList();

        String topGenre = genreCounts.isEmpty() ? "N/A" : genreCounts.get(0).getName();
        String topArtist = albums.stream()
                .map(Album::getArtistName)
                .filter(name -> name != null && !name.isBlank())
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
                .entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("N/A");

        double averageRating = albums.stream()
                .filter(album -> album.getUserRating() != null)
                .mapToInt(Album::getUserRating)
                .average()
                .orElse(0.0);

        double averagePrice = albums.stream()
                .filter(album -> album.getPrice() != null)
                .mapToDouble(Album::getPrice)
                .average()
                .orElse(0.0);

        return AnalyticsDTO.builder()
                .totalAlbums(albums.size())
                .averageRating(Math.round(averageRating * 10.0) / 10.0)
                .averagePrice(Math.round(averagePrice * 100.0) / 100.0)
                .topArtist(topArtist)
                .topGenre(topGenre)
                .genres(genreCounts)
                .releasesByYear(releaseYears)
                .ratings(ratingCounts)
                .trackCounts(trackCountBuckets)
                .build();
    }

    public String getInsights(User user) {
        AnalyticsDTO analytics = getAnalytics(user);
        if (analytics.getTotalAlbums() == 0) {
            return "Your library is still empty. Search and save a few albums to start generating insights.";
        }

        return String.format(
                "Your library contains %d albums with a strong %s profile. %s is your most frequent artist, and your collection spans %d release years.",
                analytics.getTotalAlbums(),
                analytics.getTopGenre(),
                analytics.getTopArtist(),
                analytics.getReleasesByYear().size()
        );
    }

    private String bucketTrackCount(Integer trackCount) {
        if (trackCount == null || trackCount <= 0) {
            return "Unknown";
        }
        if (trackCount <= 5) {
            return "1-5";
        }
        if (trackCount <= 10) {
            return "6-10";
        }
        if (trackCount <= 15) {
            return "11-15";
        }
        return "16+";
    }

    private AlbumDTO mapToDto(Album album) {
        return AlbumDTO.builder()
                .id(album.getId())
                .appleCatalogId(album.getAppleCatalogId())
                .title(album.getTitle())
                .artistName(album.getArtistName())
                .genre(album.getGenre())
                .releaseDate(album.getReleaseDate())
                .trackCount(album.getTrackCount())
                .artworkUrl(album.getArtworkUrl())
                .price(album.getPrice())
                .userRating(album.getUserRating())
                .userNotes(album.getUserNotes())
                .createdAt(album.getCreatedAt())
                .updatedAt(album.getUpdatedAt())
                .build();
    }
}
