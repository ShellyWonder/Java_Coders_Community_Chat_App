package com.wonderwebdev.a14_chatapp.dto;

import java.util.Set;

public class UserDTO {
    private Long id;
    private String userName;
    private String password;
    private String firstName;
    private String lastName;
    private Set<ChannelSummaryDTO> channels;

    //Constructors are optional, but added for simplicity and consistency
    public UserDTO() {
    }
    
    public UserDTO(Long id, String userName, String password, String firstName, String lastName, Set<ChannelSummaryDTO> channels) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.channels = channels;
    }
    // Getters and setters
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
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public Set<ChannelSummaryDTO> getChannels() {
        return channels;
    }
    public void setChannels(Set<ChannelSummaryDTO> channels) {
        this.channels = channels;
    }
    
}
