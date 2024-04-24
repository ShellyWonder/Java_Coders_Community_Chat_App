package com.wonderwebdev.a14_chatapp.domain;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
public class Channel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;

    @OneToMany(mappedBy = "channel", fetch = FetchType.LAZY)
    private List<Chat> messages = new ArrayList<>(); // This line establishes the bidirectional relationship

    @ManyToMany(mappedBy = "channels", fetch = FetchType.LAZY)
    private Set<User> users = new HashSet<>();

    public Channel() {
    }

    public Channel(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    
    public List<Chat> getMessages() {
        return messages;
    }
    
    public void setMessages(List<Chat> messages) {
        this.messages = messages;
    }
    
    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
    
    @Override
    public String toString() {
        return "Channel [id=" + id + ", name=" + name + ", description=" + description + ", getId()=" + getId()
                + ", getName()=" + getName() + ", getDescription()=" + getDescription() + ", getMessages)=" + getMessages() + ", getClass()=" + getClass()
                + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
    }
    
}
