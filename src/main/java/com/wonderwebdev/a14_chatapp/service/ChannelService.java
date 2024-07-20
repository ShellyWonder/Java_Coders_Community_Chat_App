package com.wonderwebdev.a14_chatapp.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.stream.Collectors;
import com.wonderwebdev.a14_chatapp.domain.Channel;
import com.wonderwebdev.a14_chatapp.dto.ChannelDTO;
import com.wonderwebdev.a14_chatapp.dto.ChatSummaryDTO;
import com.wonderwebdev.a14_chatapp.dto.UserSummaryDTO;
import com.wonderwebdev.a14_chatapp.mapper.ChannelMapper;
import com.wonderwebdev.a14_chatapp.mapper.ChatMapper;
import com.wonderwebdev.a14_chatapp.mapper.UserMapper;
import com.wonderwebdev.a14_chatapp.repository.ChannelRepository;
import com.wonderwebdev.a14_chatapp.repository.ChatRepository;

@Service
public class ChannelService {

    private final ChannelRepository channelRepository;
    private final ChannelMapper channelMapper;
    private final ChatRepository chatRepository;
    private final ChatMapper chatMapper;
    private final UserMapper userMapper;
    private static final Logger logger = (Logger) LoggerFactory.getLogger(ChannelService.class);

    public ChannelService(ChannelRepository channelRepository, ChatRepository chatRepository,
            ChannelMapper channelMapper, ChatMapper chatMapper, UserMapper userMapper) {
        this.channelRepository = channelRepository;
        this.chatRepository = chatRepository;
        this.channelMapper = channelMapper;
        this.chatMapper = chatMapper;
        this.userMapper = userMapper;
    }

    public Optional<ChannelDTO> findChannelById(Long id) {
        return channelRepository.findById(id)
                .map(channel -> new ChannelDTO(channel.getId(), channel.getName(), channel.getDescription()));
    }

    public List<ChannelDTO> findAllChannels() {
        List<Channel> channels = channelRepository.findAll();
        return channels.stream()
                .map(this::mapToChannelDTO)
                .collect(Collectors.toList());
    }

    public List<ChatSummaryDTO> findMessagesByChannelId(Long channelId) {
        return chatRepository.findByChannelId(channelId).stream()
                .map(chat -> {
                    ChatSummaryDTO chatSummaryDTO = new ChatSummaryDTO();
                    chatSummaryDTO.setId(chat.getId());
                    chatSummaryDTO.setMessage(chat.getMessage());
                    chatSummaryDTO.setUserName(chat.getUser() != null ? chat.getUser().getUserName() : "Unknown User");
                    chatSummaryDTO.setPublishedAt(chat.getPublishedAt());

                    // Log the values being set
                    System.out.println("Chat ID: " + chat.getId());
                    System.out.println("Published At: " + chat.getPublishedAt());
                    System.out.println("Message: " + chat.getMessage());

                    return chatSummaryDTO;
                }).collect(Collectors.toList());
    }

    public ChannelDTO mapToChannelDTO(Channel channel) {
        ChannelDTO channelDTO = channelMapper.toDto(channel);

        List<ChatSummaryDTO> chatSummaryDTOs = channel.getMessages().stream()
                .map(chat -> {
                    ChatSummaryDTO chatSummaryDTO = chatMapper.toSummaryDto(chat);
                    chatSummaryDTO.setUserName(chat.getUser().getUserName());
                    chatSummaryDTO.setPublishedAt(chat.getPublishedAt());
                    return chatSummaryDTO;
                })
                .collect(Collectors.toList());
        channelDTO.setMessages(chatSummaryDTOs);

        List<UserSummaryDTO> userSummaryDTOs = channel.getUsers().stream()
                .map(userMapper::toSummaryDto)
                .collect(Collectors.toList());
        channelDTO.setUsers(userSummaryDTOs);

        return channelDTO;
    }

    public Channel fetchChannelById(Long channelId) {
        return channelRepository.findById(channelId)
                                .orElseThrow(() -> new RuntimeException("Channel not found"));
    }

    public int getParticipantCount(Long channelId) {
        return channelRepository.findById(channelId)
                .map(channel -> {
                    int count = channel.getUsers().size();
                    logger.info("Channel ID: {} has {} participants", channelId, count);
                    return count;
                })
                .orElseGet(() -> {
                    logger.warn("Channel ID: {} not found", channelId);
                    return 0;
                });
    }
}
