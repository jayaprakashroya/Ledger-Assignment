package com.example.musiccatalog.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class AuthResponse {

    private String token;
    private String email;

    @JsonProperty("user_id")
    private UUID userId;

    public AuthResponse() {
    }

    public static AuthResponseBuilder builder() { return new AuthResponseBuilder(); }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public static class AuthResponseBuilder {
        private final AuthResponse instance = new AuthResponse();
        public AuthResponseBuilder token(String token) { instance.setToken(token); return this; }
        public AuthResponseBuilder email(String email) { instance.setEmail(email); return this; }
        public AuthResponseBuilder userId(UUID userId) { instance.setUserId(userId); return this; }
        public AuthResponse build() { return instance; }
    }
}
