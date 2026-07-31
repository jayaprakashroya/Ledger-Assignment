package com.example.musiccatalog.controller;

import com.example.musiccatalog.dto.LibraryItemDTO;
import com.example.musiccatalog.dto.ApiResponse;
import com.example.musiccatalog.dto.AnalyticsDTO;
import com.example.musiccatalog.dto.CreateLibraryItemRequest;
import com.example.musiccatalog.model.User;
import com.example.musiccatalog.service.LibraryItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/library")
public class LibraryController {

    @Autowired
    private LibraryItemService libraryItemService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<LibraryItemDTO>>> getLibrary(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(ApiResponse.success(libraryItemService.getLibrary(user), "Library fetched successfully"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<LibraryItemDTO>> createAlbum(
            @Valid @RequestBody CreateLibraryItemRequest request,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(ApiResponse.success(libraryItemService.createItem(request, user), "Item added to library"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<LibraryItemDTO>> updateAlbum(
            @PathVariable java.util.UUID id,
            @Valid @RequestBody CreateLibraryItemRequest request,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(ApiResponse.success(libraryItemService.updateItem(id, request, user), "Item updated"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAlbum(@PathVariable java.util.UUID id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        libraryItemService.deleteItem(id, user);
        return ResponseEntity.ok(ApiResponse.success(null, "Item removed from library"));
    }

    @GetMapping("/analytics")
    public ResponseEntity<ApiResponse<AnalyticsDTO>> getAnalytics(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(ApiResponse.success(libraryItemService.getAnalytics(user), "Analytics generated"));
    }

    @GetMapping("/insights")
    public ResponseEntity<ApiResponse<String>> getInsights(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(ApiResponse.success(libraryItemService.getInsights(user), "Insights generated"));
    }
}
