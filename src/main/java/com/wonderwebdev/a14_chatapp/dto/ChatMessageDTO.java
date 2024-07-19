package com.wonderwebdev.a14_chatapp.dto;

import java.time.LocalDateTime;

public class ChatMessageDTO {
    private Long id;
    private ChannelSummaryDTO channel;
    private UserSummaryDTO user;
    private String userName;
    private String message;
    private LocalDateTime publishedAt;

    public ChatMessageDTO() {
    }

    public ChatMessageDTO(Long id, ChannelSummaryDTO channel, UserSummaryDTO user, String userName, String message, LocalDateTime publishedAt) {
        this.id = id;
        this.channel = channel;
        this.user = user;
        this.userName = userName;
        this.message = message;
        this.publishedAt = publishedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ChannelSummaryDTO getChannel() {
        return channel;
    }

    public void setChannel(ChannelSummaryDTO channel) {
        this.channel = channel;
    }

    public UserSummaryDTO getUser() {
        return user;
    }

    public void setUser(UserSummaryDTO user) {
        this.user = user;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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
        this.publishedAt = publishedAt;
    }
}
