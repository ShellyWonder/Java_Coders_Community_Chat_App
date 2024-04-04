package com.wonderwebdev.a14_chatapp.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;
    private String channel;
    private String user;

    public Message() {
    }

    public Message(Long id, String message, String channel, String user) {
        this.id = id;
        this.message = message;
        this.channel = channel;
        this.user = user;
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
    public String getChannel() {
        return channel;
    }
    public void setChannel(String channel) {
        this.channel = channel;
    }
    public String getUser() {
        return user;
    }
    public void setUser(String user) {
        this.user = user;
    }
    @Override
    public String toString() {
        return "Message [id=" + id + ", message=" + message + ", channel=" + channel + ", user=" + user + ", getId()="
                + getId() + ", getMessage()=" + getMessage() + ", getChannel()=" + getChannel() + ", getUser()="
                + getUser() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()="
                + super.toString() + "]";
    }
}
