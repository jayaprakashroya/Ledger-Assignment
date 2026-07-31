package com.example.musiccatalog.dto;

import java.time.LocalDateTime;

public class ApiResponse<T> {

    private boolean success;
    private String message;
    private T data;
    private String timestamp;
    private String path;

    public ApiResponse() {
    }

    public static <T> ApiResponseBuilder<T> builder() { return new ApiResponseBuilder<>(); }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public T getData() { return data; }
    public void setData(T data) { this.data = data; }
    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }

    public static <T> ApiResponse<T> success(T data, String message) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setSuccess(true);
        response.setMessage(message);
        response.setData(data);
        response.setTimestamp(LocalDateTime.now().toString());
        return response;
    }

    public static <T> ApiResponse<T> error(String message) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setSuccess(false);
        response.setMessage(message);
        response.setTimestamp(LocalDateTime.now().toString());
        return response;
    }

    public static class ApiResponseBuilder<T> {
        private final ApiResponse<T> instance = new ApiResponse<>();
        public ApiResponseBuilder<T> success(boolean success) { instance.setSuccess(success); return this; }
        public ApiResponseBuilder<T> message(String message) { instance.setMessage(message); return this; }
        public ApiResponseBuilder<T> data(T data) { instance.setData(data); return this; }
        public ApiResponseBuilder<T> timestamp(String timestamp) { instance.setTimestamp(timestamp); return this; }
        public ApiResponseBuilder<T> path(String path) { instance.setPath(path); return this; }
        public ApiResponse<T> build() { return instance; }
    }
}
