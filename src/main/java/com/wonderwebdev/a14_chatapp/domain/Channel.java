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
    private String name;
    private String description;

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

    @Override
    public String toString() {
        return "Channel [id=" + id + ", name=" + name + ", description=" + description + ", getId()=" + getId()
                + ", getName()=" + getName() + ", getDescription()=" + getDescription() + ", getClass()=" + getClass()
                + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
    }
   
    
}
