package com.wonderwebdev.a14_chatapp.dto;

import java.util.List;

// Create a new DTO to encapsulate channel view data
public class ChannelViewDTO {
    private ChannelDTO channel;
    private List<ChatSummaryDTO> messages;
    private int participantCount;
    
    public ChannelViewDTO() {
    }
    
    // Constructors, getters, and setters
    public ChannelViewDTO(ChannelDTO channel, List<ChatSummaryDTO> messages, int participantCount) {
        this.channel = channel;
        this.messages = messages;
        this.participantCount = participantCount;
    }
    
    public ChannelDTO getChannel() {
        return channel;
    }
    public void setChannel(ChannelDTO channel) {
        this.channel = channel;
    }
    
    public List<ChatSummaryDTO> getMessages() {
        return messages;
    }
    
    public void setMessages(List<ChatSummaryDTO> messages) {
        this.messages = messages;
    }
    public int getParticipantCount() {
        return participantCount;
    }
    
    public void setParticipantCount(int participantCount) {
        this.participantCount = participantCount;
    }
}