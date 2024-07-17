package com.wonderwebdev.a14_chatapp.dto;

import java.time.LocalDateTime;

public class ChatSummaryDTO {
    private Long id;
    private String message;
    private String userName;
    private LocalDateTime publishedAt;
    
    public ChatSummaryDTO() {
    }
    public ChatSummaryDTO(Long id, String message, LocalDateTime publishedAt, String userName) {
        this.id = id;
        this.message = message;
        this.userName = userName;
        this.publishedAt = publishedAt;
    }


    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public LocalDateTime getPublishedAt() {
        return publishedAt;
    }
    public void setPublishedAt(LocalDateTime publishedAt) {
        this.publishedAt = publishedAt;
    }
}
