package com.wonderwebdev.a14_chatapp.service;

import org.springframework.stereotype.Service;

import com.wonderwebdev.a14_chatapp.domain.Chat;
import com.wonderwebdev.a14_chatapp.domain.Channel;
import com.wonderwebdev.a14_chatapp.dto.ChannelViewDTO;
import com.wonderwebdev.a14_chatapp.dto.ChatMessageDTO;
import com.wonderwebdev.a14_chatapp.dto.ChatSummaryDTO;
import com.wonderwebdev.a14_chatapp.mapper.ChatMapper;
import com.wonderwebdev.a14_chatapp.mapper.UserMapper;
import com.wonderwebdev.a14_chatapp.repository.ChatRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

   private ChatMapper chatMapper;
   private UserMapper userMapper;
    private ChatRepository chatRepository;
    private ChannelService channelService;
    private UserService userService;
    

    public ChatService(ChatMapper chatMapper, UserMapper userMapper, ChatRepository chatRepository, 
                       ChannelService channelService, UserService userService) {
        this.chatRepository = chatRepository;
        this.channelService = channelService;
        this.chatMapper = chatMapper;
        this.userService = userService;
        this.userMapper = userMapper;
    }

    public List<ChatMessageDTO> getMessagesByChannelId(Long channelId) {
        return chatRepository.findByChannelId(channelId)
                             .stream()
                             .map(chatMapper::toMessageDto)
                             .collect(Collectors.toList());
    }

    public ChatMessageDTO sendMessage(Long channelId, ChatMessageDTO messageDTO) {
        if (messageDTO.getUser() == null || messageDTO.getUser().getId() == null) {
            throw new IllegalArgumentException("User information is missing in the message.");
        }
        Chat chatMessage = chatMapper.toEntity(messageDTO);
        // Setting the channel based on the provided ID
        chatMessage.setChannel(channelService.fetchChannelById(channelId)); 
        chatMessage.setUser(userService.fetchUserById(messageDTO.getUser().getId()));
        Chat savedMessage = chatRepository.save(chatMessage);
        ChatMessageDTO savedMessageDTO = chatMapper.toMessageDto(savedMessage);
        //Manually map user to DTO
        savedMessageDTO.setUser(userMapper.toSummaryDto(savedMessage.getUser()));
        return savedMessageDTO;
    }

    //saves a message without explicitly setting the channel (e.g., draft messages, global messages)
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
