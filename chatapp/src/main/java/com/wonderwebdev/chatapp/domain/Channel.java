package com.wonderwebdev.chatapp.domain;

public class Channel {
    private Long id;
    private String message;
    private String channel;
    private String user;

    public Channel(Long id, String message, String channel, String user) {
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

}