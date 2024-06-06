package com.wonderwebdev.a14_chatapp.dto;

import java.time.LocalDateTime;

public class ChatSummaryDTO {
    private Long id;
    private String message;
    private LocalDateTime publishedAt;
    private String userName;
    
    public ChatSummaryDTO() {
    }
    public ChatSummaryDTO(Long id, String message, LocalDateTime publishedAt, String userName) {
        this.id = id;
        this.message = message;
        this.publishedAt = publishedAt;
        this.userName = userName;
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
    public LocalDateTime getPublishedAt() {
        return publishedAt;
    }
    public void setPublishedAt(LocalDateTime publishedAt) {
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
}
