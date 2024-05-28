package com.wonderwebdev.a14_chatapp.dto;

import java.time.LocalDateTime;

public class ChatDTO {
    private Long id;
    private String message;
    private UserDTO user;
    private LocalDateTime publishedAt;
    
    //Constructors are optional, but added for simplicity and consistency
    public ChatDTO() {
    }
    
    public ChatDTO(Long id, String message, UserDTO user, LocalDateTime publishedAt) {
        this.id = id;
        this.message = message;
        this.user = user;
        this.publishedAt = publishedAt;
    }

    // Getters and setters
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
    public UserDTO getUser() {
        return user;
    }
    public void setUser(UserDTO user) {
        this.user = user;
    }
    public LocalDateTime getPublishedAt() {
        return publishedAt;
    }
    public void setPublishedAt(LocalDateTime publishedAt) {
        this.publishedAt = publishedAt;
    }
}
