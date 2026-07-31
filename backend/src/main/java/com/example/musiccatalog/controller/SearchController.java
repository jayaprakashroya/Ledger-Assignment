package com.example.musiccatalog.controller;

import com.example.musiccatalog.dto.AlbumDTO;
import com.example.musiccatalog.dto.ApiResponse;
import com.example.musiccatalog.service.ITunesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SearchController {

    @Autowired
    private ITunesService iTunesService;

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<AlbumDTO>>> search(
            @RequestParam String query,
            @RequestParam(defaultValue = "album") String type,
            @RequestParam(defaultValue = "10") int limit) {
        List<AlbumDTO> results = iTunesService.search(query, type, limit);
        return ResponseEntity.ok(ApiResponse.success(results, "Search completed"));
    }
}
