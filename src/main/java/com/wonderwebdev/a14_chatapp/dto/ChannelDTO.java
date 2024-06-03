package com.wonderwebdev.a14_chatapp.dto;

import java.util.List;

public class ChannelDTO {
    private Long id;
    private String name;
    private String description;
    
    private List<ChatDTO> messages; // This line establishes the bidirectional relationship
    private List<UserSummaryDTO> users; 
    
    
    //Constructors are optional, but added for simplicity and consistency
    public ChannelDTO() {
    }
    
    public ChannelDTO(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
        
    // Getters and setters
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

    public List<ChatDTO> getMessages() {
        return messages;
    }

    public void setMessages(List<ChatDTO> messages) {
        this.messages = messages;
    }
    
    public List<UserSummaryDTO> getUsers() {
        return users;
    }
    public void setUsers(List<UserSummaryDTO> users) {
        this.users = users;
    }

}
