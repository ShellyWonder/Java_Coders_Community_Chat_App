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
    private String user;
    @Column(nullable = false)
    private LocalDateTime publishedAt;

    
    public Message() {
    }
    
    public Message(Long id, String message, Channel channel, String user, LocalDateTime publishedAt) {
        this.id = id;
        this.message = message;
        this.channel = channel;
        this.user = user;
        this.publishedAt = LocalDateTime.now();
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
    public String getUser() {
        return user;
    }
    public void setUser(String user) {
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
        return "Message [id=" + id + ", message=" + message + ", channel=" + channel + ", user=" + user + ", getId()="
                + getId() + ", getMessage()=" + getMessage() + ", getChannel()=" + getChannel() + ", getUser()="
                + getUser() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()="
                + super.toString() + "]";
    }
}
