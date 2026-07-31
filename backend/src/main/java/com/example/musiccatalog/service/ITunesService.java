package com.example.musiccatalog.service;

import com.example.musiccatalog.dto.AlbumDTO;
import com.example.musiccatalog.dto.ITunesAlbumResult;
import com.example.musiccatalog.dto.ITunesSearchResponse;
import com.example.musiccatalog.exception.InvalidArgumentException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Service
public class ITunesService {

    private final WebClient webClient;

    public ITunesService(WebClient.Builder webClientBuilder, @Value("${itunes.api.baseurl}") String baseUrl) {
        this.webClient = webClientBuilder.baseUrl(baseUrl).build();
    }

    @Cacheable(value = "itunesSearch", key = "#query + '::' + #type + '::' + #limit")
    public List<AlbumDTO> search(String query, String type, int limit) {
        if (!StringUtils.hasText(query)) {
            throw new InvalidArgumentException("Search query is required");
        }

        String entity = switch (type.toLowerCase()) {
            case "album" -> "album";
            case "song" -> "song";
            case "artist" -> "musicArtist";
            default -> throw new InvalidArgumentException("Unsupported search type: " + type);
        };

        try {
                ITunesSearchResponse response = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/search")
                            .queryParam("term", query)
                            .queryParam("entity", entity)
                            .queryParam("limit", Math.max(1, Math.min(limit, 50)))
                            .build())
                    .retrieve()
                    .bodyToMono(ITunesSearchResponse.class)
                    .block();

            if (response == null || response.getResults() == null) {
                return List.of();
            }

            return response.getResults().stream().map(this::mapToAlbumDto).toList();
        } catch (WebClientResponseException ex) {
            throw new InvalidArgumentException("Unable to reach iTunes search service: " + ex.getStatusCode());
        }
    }

    private AlbumDTO mapToAlbumDto(ITunesAlbumResult result) {
        return AlbumDTO.builder()
                .appleCatalogId(result.getCollectionId())
                .title(result.getCollectionName())
                .artistName(result.getArtistName())
                .genre(result.getPrimaryGenreName())
                .releaseDate(parseReleaseDate(result.getReleaseDate()))
                .trackCount(result.getTrackCount())
                .artworkUrl(result.getArtworkUrl600() != null ? result.getArtworkUrl600() : result.getArtworkUrl100())
                .price(result.getCollectionPrice())
                .build();
    }

    private LocalDate parseReleaseDate(String releaseDate) {
        if (!StringUtils.hasText(releaseDate)) {
            return null;
        }

        try {
            return Instant.parse(releaseDate).atZone(ZoneId.systemDefault()).toLocalDate();
        } catch (Exception ignored) {
            try {
                return LocalDate.parse(releaseDate.substring(0, 10));
            } catch (Exception ignoredAgain) {
                return null;
            }
        }
    }
}
