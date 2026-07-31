package com.example.musiccatalog.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    public LoginRequest() {
    }

    public static LoginRequestBuilder builder() { return new LoginRequestBuilder(); }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public static class LoginRequestBuilder {
        private final LoginRequest instance = new LoginRequest();
        public LoginRequestBuilder email(String email) { instance.setEmail(email); return this; }
        public LoginRequestBuilder password(String password) { instance.setPassword(password); return this; }
        public LoginRequest build() { return instance; }
    }
}
