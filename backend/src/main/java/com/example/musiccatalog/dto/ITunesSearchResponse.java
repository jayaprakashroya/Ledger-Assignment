package com.example.musiccatalog.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ITunesSearchResponse {

    @JsonProperty("resultCount")
    private Integer resultCount;

    @JsonProperty("results")
    private List<ITunesAlbumResult> results;

    public ITunesSearchResponse() {
    }

    public static ITunesSearchResponseBuilder builder() { return new ITunesSearchResponseBuilder(); }

    public Integer getResultCount() { return resultCount; }
    public void setResultCount(Integer resultCount) { this.resultCount = resultCount; }
    public List<ITunesAlbumResult> getResults() { return results; }
    public void setResults(List<ITunesAlbumResult> results) { this.results = results; }

    public static class ITunesSearchResponseBuilder {
        private final ITunesSearchResponse instance = new ITunesSearchResponse();
        public ITunesSearchResponseBuilder resultCount(Integer resultCount) { instance.setResultCount(resultCount); return this; }
        public ITunesSearchResponseBuilder results(List<ITunesAlbumResult> results) { instance.setResults(results); return this; }
        public ITunesSearchResponse build() { return instance; }
    }
}
