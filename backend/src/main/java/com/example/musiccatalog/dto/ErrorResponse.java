package com.example.musiccatalog.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

public class ErrorResponse {

    private int status;
    private String error;
    private String message;
    private String path;
    private String timestamp;

    @JsonProperty("validation_errors")
    private Map<String, String> validationErrors;

    public ErrorResponse() {
    }

    public static ErrorResponseBuilder builder() { return new ErrorResponseBuilder(); }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }
    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }
    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
    public Map<String, String> getValidationErrors() { return validationErrors; }
    public void setValidationErrors(Map<String, String> validationErrors) { this.validationErrors = validationErrors; }

    public static class ErrorResponseBuilder {
        private final ErrorResponse instance = new ErrorResponse();
        public ErrorResponseBuilder status(int status) { instance.setStatus(status); return this; }
        public ErrorResponseBuilder error(String error) { instance.setError(error); return this; }
        public ErrorResponseBuilder message(String message) { instance.setMessage(message); return this; }
        public ErrorResponseBuilder path(String path) { instance.setPath(path); return this; }
        public ErrorResponseBuilder timestamp(String timestamp) { instance.setTimestamp(timestamp); return this; }
        public ErrorResponseBuilder validationErrors(Map<String, String> validationErrors) { instance.setValidationErrors(validationErrors); return this; }
        public ErrorResponse build() { return instance; }
    }
}
