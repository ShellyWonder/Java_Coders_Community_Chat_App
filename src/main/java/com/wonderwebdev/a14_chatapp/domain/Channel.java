package com.wonderwebdev.a14_chatapp.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Channel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;
    private String channel;
    private String user;

    public Channel() {
    }

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
        @Override 
         public String toString(){
            return "Channel{" +
                            "id=" + id +
                            ", message='" + message + '\'' +
                            ", channel='" + channel + '\'' +
                            ", user='" + user + '\'' +
                            '}';
         } 

 
}
