package com.wonderwebdev.chatapp.domain;

public class User {
    private Long id; 
    private String userName;
        
    public User() {
    }
    
    
    public User(Long id, String userName) {
        this.id = id;
        this.userName = userName;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getUserName() {
        return userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
    }
    
    @Override
    public String toString() {
        return "User [id=" + id + ", userName=" + userName + ", getId()=" + getId() + ", getUserName()=" + getUserName()
                + ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
                + "]";
    }
}
