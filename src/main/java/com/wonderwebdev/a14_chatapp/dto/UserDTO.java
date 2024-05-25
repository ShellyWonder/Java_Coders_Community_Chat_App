package com.wonderwebdev.a14_chatapp.dto;

public class UserDTO {
    private Long id;
    private String username;

    //Constructors are optional, but added for simplicity and consistency
    public UserDTO() {
    }
    
    public UserDTO(Long id, String username) {
        this.id = id;
        this.username = username;
    }
    // Getters and setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
}
