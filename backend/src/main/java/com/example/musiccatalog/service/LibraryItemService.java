package com.example.musiccatalog.service;

import com.example.musiccatalog.dto.AnalyticsDTO;
import com.example.musiccatalog.dto.CreateLibraryItemRequest;
import com.example.musiccatalog.dto.LibraryItemDTO;
import com.example.musiccatalog.exception.DuplicateResourceException;
import com.example.musiccatalog.exception.ResourceNotFoundException;
import com.example.musiccatalog.model.LibraryItem;
import com.example.musiccatalog.model.User;
import com.example.musiccatalog.repository.LibraryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Transactional
public class LibraryItemService {

    @Autowired
    private LibraryItemRepository repository;

    public List<LibraryItemDTO> getLibrary(User user) {
        return repository.findByUser(user).stream().map(this::mapToDto).toList();
    }

    public LibraryItemDTO createItem(CreateLibraryItemRequest request, User user) {
        if (repository.existsByUserAndAppleCatalogId(user, request.getAppleCatalogId())) {
            throw new DuplicateResourceException("Item already exists in your library");
        }

        LibraryItem item = LibraryItem.builder()
                .appleCatalogId(request.getAppleCatalogId())
                .title(request.getTitle())
                .artistName(request.getArtistName())
                .genre(request.getGenre())
                .releaseDate(request.getReleaseDate())
                .trackCount(request.getTrackCount())
                .artworkUrl(request.getArtworkUrl())
                .collectionPrice(request.getCollectionPrice())
                .userRating(request.getUserRating())
                .userNotes(request.getUserNotes())
                .user(user)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return mapToDto(repository.save(item));
    }

    public LibraryItemDTO updateItem(java.util.UUID id, CreateLibraryItemRequest request, User user) {
        LibraryItem item = repository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("LibraryItem", "id", id));

        // Only allow update of rating and notes in place
        item.setUserRating(request.getUserRating());
        item.setUserNotes(request.getUserNotes());
        item.setUpdatedAt(LocalDateTime.now());

        return mapToDto(repository.save(item));
    }

    public void deleteItem(java.util.UUID id, User user) {
        LibraryItem item = repository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("LibraryItem", "id", id));
        repository.delete(item);
    }

    public AnalyticsDTO getAnalytics(User user) {
        List<LibraryItem> items = repository.findByUser(user);

        Map<String, Long> genres = items.stream()
                .map(i -> i.getGenre() == null || i.getGenre().isBlank() ? "Unknown" : i.getGenre())
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        Map<String, Long> releasesByYear = items.stream()
                .filter(i -> i.getReleaseDate() != null)
                .collect(Collectors.groupingBy(i -> String.valueOf(i.getReleaseDate().getYear()), Collectors.counting()));

        Map<String, Long> ratings = items.stream()
                .map(i -> i.getUserRating() == null ? "Unrated" : String.valueOf(i.getUserRating()))
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        Map<String, Long> trackBuckets = items.stream()
                .map(i -> bucketTrackCount(i.getTrackCount()))
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
        String topArtist = items.stream()
                .map(LibraryItem::getArtistName)
                .filter(name -> name != null && !name.isBlank())
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
                .entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("N/A");

        double averageRating = items.stream()
                .filter(i -> i.getUserRating() != null)
                .mapToInt(LibraryItem::getUserRating)
                .average()
                .orElse(0.0);

        double averagePrice = items.stream()
                .filter(i -> i.getCollectionPrice() != null)
                .mapToDouble(LibraryItem::getCollectionPrice)
                .average()
                .orElse(0.0);

        return AnalyticsDTO.builder()
                .totalAlbums(items.size())
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
        List<LibraryItem> items = repository.findByUser(user);
        if (items.isEmpty()) {
            return "Your library is still empty. Search and save a few albums to start generating insights.";
        }

        AnalyticsDTO analytics = getAnalytics(user);
        StringBuilder insights = new StringBuilder();

        // 1. Main library overview
        insights.append(String.format("📚 **Your Music Library Overview**\n"));
        insights.append(String.format("You have %d albums in your collection with a strong %s profile. ", 
                analytics.getTotalAlbums(), analytics.getTopGenre()));
        insights.append(String.format("%s is your most frequent artist. ", analytics.getTopArtist()));
        insights.append(String.format("Your collection spans %d years.\n\n", analytics.getReleasesByYear().size()));

        // 2. Mood Classification
        String mood = classifyMood(analytics);
        insights.append(String.format("🎵 **Your Music Mood**\n"));
        insights.append(mood).append("\n\n");

        // 3. Artist Recommendations
        String recommendations = generateArtistRecommendations(items, analytics);
        insights.append(String.format("⭐ **Artist Deep Dive**\n"));
        insights.append(recommendations).append("\n\n");

        // 4. Playlist Suggestions
        String playlists = generatePlaylistSuggestions(items, analytics);
        insights.append(String.format("🎧 **Suggested Playlists**\n"));
        insights.append(playlists).append("\n\n");

        // 5. Rating & Quality Analysis
        String qualityAnalysis = analyzeQuality(items, analytics);
        insights.append(String.format("💎 **Collection Quality**\n"));
        insights.append(qualityAnalysis);

        return insights.toString();
    }

    private String classifyMood(AnalyticsDTO analytics) {
        String topGenre = analytics.getTopGenre().toLowerCase();
        double avgRating = analytics.getAverageRating();

        // Mood classification based on genre and rating
        String moodType = "";
        String energyLevel = "";

        if (topGenre.contains("metal") || topGenre.contains("rock") || topGenre.contains("punk")) {
            moodType = "HIGH ENERGY & REBELLIOUS";
            energyLevel = "⚡⚡⚡";
        } else if (topGenre.contains("classical") || topGenre.contains("jazz") || topGenre.contains("ambient")) {
            moodType = "CALM & INTROSPECTIVE";
            energyLevel = "😌";
        } else if (topGenre.contains("pop") || topGenre.contains("edm") || topGenre.contains("dance")) {
            moodType = "UPBEAT & DANCEABLE";
            energyLevel = "💃";
        } else if (topGenre.contains("blues") || topGenre.contains("soul") || topGenre.contains("r&b")) {
            moodType = "SOULFUL & EMOTIONAL";
            energyLevel = "💜";
        } else if (topGenre.contains("hip-hop") || topGenre.contains("rap")) {
            moodType = "DYNAMIC & EXPRESSIVE";
            energyLevel = "🔥";
        } else {
            moodType = "ECLECTIC & DIVERSE";
            energyLevel = "🌈";
        }

        String ratingQuality = avgRating >= 4.5 ? "You rate albums very highly!" 
                             : avgRating >= 3.5 ? "You have solid taste with consistent quality."
                             : "You're open to exploring different styles.";

        return String.format("%s %s\nYour %s genre dominates your collection. %s",
                energyLevel, moodType, analytics.getTopGenre(), ratingQuality);
    }

    private String generateArtistRecommendations(List<LibraryItem> items, AnalyticsDTO analytics) {
        Map<String, List<LibraryItem>> artistAlbums = items.stream()
                .collect(Collectors.groupingBy(LibraryItem::getArtistName));

        // Top artists by album count
        String topArtists = artistAlbums.entrySet().stream()
                .sorted((a, b) -> Integer.compare(b.getValue().size(), a.getValue().size()))
                .limit(3)
                .map(entry -> {
                    int count = entry.getValue().size();
                    double avgRating = entry.getValue().stream()
                            .filter(i -> i.getUserRating() != null)
                            .mapToInt(LibraryItem::getUserRating)
                            .average().orElse(0.0);
                    return String.format("• **%s** – %d album%s (★ %.1f avg)",
                            entry.getKey(), count, count > 1 ? "s" : "", avgRating);
                })
                .collect(Collectors.joining("\n"));

        // Underrated gems (4+ tracks, rated 3 or lower)
        String gems = items.stream()
                .filter(i -> i.getUserRating() != null && i.getUserRating() <= 3 && (i.getTrackCount() == null || i.getTrackCount() > 8))
                .limit(2)
                .map(i -> String.format("• **%s** by %s – Give this another listen!", i.getTitle(), i.getArtistName()))
                .collect(Collectors.joining("\n"));

        if (gems.isEmpty()) {
            gems = "All rated albums are highly appreciated!";
        }

        return "Most Prolific:\n" + topArtists + "\n\nUnderrated Gems to Revisit:\n" + gems;
    }

    private String generatePlaylistSuggestions(List<LibraryItem> items, AnalyticsDTO analytics) {
        StringBuilder playlists = new StringBuilder();

        // Era-based playlist
        Map<String, Long> yearCounts = items.stream()
                .filter(i -> i.getReleaseDate() != null)
                .collect(Collectors.groupingBy(
                        i -> {
                            int year = i.getReleaseDate().getYear();
                            if (year < 1990) return "80s & Earlier";
                            if (year < 2000) return "90s";
                            if (year < 2010) return "2000s";
                            if (year < 2020) return "2010s";
                            return "2020s";
                        },
                        Collectors.counting()
                ));

        String eraPlaylist = yearCounts.entrySet().stream()
                .sorted((a, b) -> Long.compare(b.getValue(), a.getValue()))
                .limit(1)
                .map(entry -> String.format("🎬 '%s Selection' – Your largest collection era (%d albums)",
                        entry.getKey(), entry.getValue()))
                .findFirst().orElse("Era-based playlist unavailable");

        playlists.append(eraPlaylist).append("\n");

        // Rating-based playlists
        long highRated = items.stream().filter(i -> i.getUserRating() != null && i.getUserRating() >= 5).count();
        long goodRated = items.stream().filter(i -> i.getUserRating() != null && i.getUserRating() >= 4).count();

        if (highRated > 0) {
            playlists.append(String.format("⭐ 'Favorites' – %d albums rated 5 stars\n", highRated));
        }
        if (goodRated > 2) {
            playlists.append(String.format("😍 'Solid Picks' – %d albums rated 4+ stars\n", goodRated));
        }

        // Genre-based recommendations
        String topGenre = analytics.getTopGenre();
        playlists.append(String.format("🎸 '%s Master Class' – Dive deeper into your favorite genre", topGenre));

        return playlists.toString();
    }

    private String analyzeQuality(List<LibraryItem> items, AnalyticsDTO analytics) {
        int ratedCount = (int) items.stream().filter(i -> i.getUserRating() != null).count();
        int unratedCount = items.size() - ratedCount;

        String ratingDistribution = String.format(
                "You've rated %d/%d albums (%.0f%% completion).\n",
                ratedCount, items.size(), (ratedCount * 100.0) / items.size()
        );

        String priceAnalysis = "";
        if (analytics.getAveragePrice() > 0) {
            priceAnalysis = String.format("Average price: $%.2f per album. ", analytics.getAveragePrice());
        }

        // Quality tier
        String qualityTier = analytics.getAverageRating() >= 4.5 ? "🌟 EXCELLENT – Highly curated collection"
                           : analytics.getAverageRating() >= 4.0 ? "🎯 GREAT – Strong decision-making"
                           : analytics.getAverageRating() >= 3.0 ? "📈 GOOD – Room to explore more gems"
                           : "🔍 DISCOVERING – Keep exploring!";

        return ratingDistribution + priceAnalysis + "\n" + qualityTier;
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

    private LibraryItemDTO mapToDto(LibraryItem item) {
        return LibraryItemDTO.builder()
                .id(item.getId())
                .appleCatalogId(item.getAppleCatalogId())
                .title(item.getTitle())
                .artistName(item.getArtistName())
                .genre(item.getGenre())
                .releaseDate(item.getReleaseDate())
                .trackCount(item.getTrackCount())
                .artworkUrl(item.getArtworkUrl())
                .collectionPrice(item.getCollectionPrice())
                .userRating(item.getUserRating())
                .userNotes(item.getUserNotes())
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .build();
    }
}
