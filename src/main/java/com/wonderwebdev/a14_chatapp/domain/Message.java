package com.wonderwebdev.a14_chatapp.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;
    @ManyToOne
    private Channel channel;
    @ManyToOne
    private User user;
    @Column(nullable = false)
    private LocalDateTime publishedAt;

    
    public Message() {
    }
    
    public Message(String message, Channel channel, User user) {
        this.message = message;
        this.channel = channel;
        this.user = user;
        this.publishedAt = LocalDateTime.now(); // Automatically set to current time
    }
    //overloaded constructor allows for the time to be set at creation and not automatically reset to the current time
    public Message(Long id, String message, Channel channel, User user, LocalDateTime publishedAt) {
        this.id = id;
        this.message = message;
        this.channel = channel;
        this.user = user;
        this.publishedAt = publishedAt; // Use the explicitly provided time
    }
    
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
    public Channel getChannel() {
        return channel;
    }
    public void setChannel(Channel channel) {
        this.channel = channel;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public LocalDateTime getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(LocalDateTime publishedAt) {
        this.publishedAt = publishedAt;
    }
    @Override
public String toString() {
    // Including only non-sensitive user information (e.g., user ID or userName)
    String userInfo = (user != null) ? "UserId=" + user.getId() + ", UserName=" + user.getUserName() : "User=null";
    
    return "Message [id=" + id + ", message=" + message + ", channel=" + (channel != null ? "ChannelId=" + channel.getId() + ", ChannelName=" + channel.getName() : "Channel=null") + ", " + userInfo + ", publishedAt=" + publishedAt + "]";
}

}
