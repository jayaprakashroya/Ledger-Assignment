package com.example.musiccatalog.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class UserDTO {

    private UUID id;
    private String username;
    private String email;

    @JsonProperty("full_name")
    private String fullName;

    @JsonProperty("created_at")
    private String createdAt;

    public UserDTO() {
    }

    public static UserDTOBuilder builder() { return new UserDTOBuilder(); }
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public static class UserDTOBuilder {
        private final UserDTO instance = new UserDTO();
        public UserDTOBuilder id(UUID id) { instance.setId(id); return this; }
        public UserDTOBuilder username(String username) { instance.setUsername(username); return this; }
        public UserDTOBuilder email(String email) { instance.setEmail(email); return this; }
        public UserDTOBuilder fullName(String fullName) { instance.setFullName(fullName); return this; }
        public UserDTOBuilder createdAt(String createdAt) { instance.setCreatedAt(createdAt); return this; }
        public UserDTO build() { return instance; }
    }
}
