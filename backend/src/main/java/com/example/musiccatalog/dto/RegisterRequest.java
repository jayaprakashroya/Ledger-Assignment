package com.example.musiccatalog.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class RegisterRequest {

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    public RegisterRequest() {
    }

    public static RegisterRequestBuilder builder() { return new RegisterRequestBuilder(); }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public static class RegisterRequestBuilder {
        private final RegisterRequest instance = new RegisterRequest();
        public RegisterRequestBuilder email(String email) { instance.setEmail(email); return this; }
        public RegisterRequestBuilder password(String password) { instance.setPassword(password); return this; }
        public RegisterRequest build() { return instance; }
    }
}
