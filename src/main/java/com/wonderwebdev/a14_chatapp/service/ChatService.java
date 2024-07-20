package com.wonderwebdev.a14_chatapp.service;

import org.springframework.stereotype.Service;

import com.wonderwebdev.a14_chatapp.domain.Chat;
import com.wonderwebdev.a14_chatapp.domain.Channel;
import com.wonderwebdev.a14_chatapp.dto.ChannelViewDTO;
import com.wonderwebdev.a14_chatapp.dto.ChatMessageDTO;
import com.wonderwebdev.a14_chatapp.dto.ChatSummaryDTO;
import com.wonderwebdev.a14_chatapp.mapper.ChatMapper;
import com.wonderwebdev.a14_chatapp.repository.ChatRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

   private ChatMapper chatMapper;
    private ChatRepository chatRepository;
    private ChannelService channelService;
    private UserService userService;
    

    public ChatService(ChatMapper chatMapper, ChatRepository chatRepository, ChannelService channelService, UserService userService) {
        this.chatMapper = chatMapper;
        this.chatRepository = chatRepository;
        this.channelService = channelService;
        this.userService = userService;
    }

    public List<ChatMessageDTO> getMessagesByChannelId(Long channelId) {
        return chatRepository.findByChannelId(channelId)
                             .stream()
                             .map(chatMapper::toMessageDto)
                             .collect(Collectors.toList());
    }

    public ChatMessageDTO sendMessage(Long channelId, ChatMessageDTO messageDTO) {
        Chat chatMessage = chatMapper.toEntity(messageDTO);
        // Setting the channel based on the provided ID
        chatMessage.setChannel(channelService.fetchChannelById(channelId)); 
        chatMessage.setUser(userService.fetchUserById(messageDTO.getUser().getId()));
        Chat savedMessage = chatRepository.save(chatMessage);
        return chatMapper.toMessageDto(savedMessage);
    }

    public ChatMessageDTO saveMessage(ChatMessageDTO messageDTO) {
        Chat chatMessage = chatMapper.toEntity(messageDTO);
        chatMessage.setUser(userService.fetchUserById(messageDTO.getUser().getId())); // Use UserService to fetch the user
        Chat savedMessage = chatRepository.save(chatMessage);
        return chatMapper.toMessageDto(savedMessage);
    }

    public ChannelViewDTO getChannelView(Long channelId) {
       // Fetch channel details
        Channel channel = channelService.fetchChannelById(channelId);
        // Fetch messages for the channel
        List<ChatSummaryDTO> messages = chatRepository.findByChannelId(channelId)
                                                      .stream()
                                                      .map(chatMapper::toSummaryDto)
                                                      .collect(Collectors.toList());
        // Get participant count
        int participantCount = userService.getParticipantCount(channelId);

        // Map to ChannelViewDTO
        ChannelViewDTO channelViewDTO = new ChannelViewDTO();
        channelViewDTO.setChannel(channelService.mapToChannelDTO(channel));
        channelViewDTO.setMessages(messages);
        channelViewDTO.setParticipantCount(participantCount);
        return channelViewDTO;
    }

    
}
