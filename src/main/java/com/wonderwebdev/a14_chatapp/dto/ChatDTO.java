package com.wonderwebdev.a14_chatapp.dto;

import java.time.LocalDateTime;

public class ChatDTO {
    private Long id;
    private String message;
    private UserSummaryDTO user;
    private ChannelSummaryDTO channel;
    private LocalDateTime publishedAt;
    
    //Constructors are optional, but added for simplicity and consistency
    public ChatDTO() {
    }
    
    public ChatDTO(Long id, String message, UserSummaryDTO user, ChannelSummaryDTO channel, LocalDateTime publishedAt) {
        this.id = id;
        this.message = message;
        this.user = user;
        this.channel = channel;
        this.publishedAt = publishedAt;// timestamp-- Use the explicitly provided time
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
    public UserSummaryDTO getUser() {
        return user;
    }
    public void setUser(UserSummaryDTO user) {
        this.user = user;
    }
    public ChannelSummaryDTO getChannel() {
        return channel;
    }
    public void setChannel(ChannelSummaryDTO channel) {
        this.channel = channel;
    }
    public LocalDateTime getPublishedAt() {
        return publishedAt;
    }
    public void setPublishedAt(LocalDateTime publishedAt) {
        this.publishedAt = publishedAt;
    }
}
