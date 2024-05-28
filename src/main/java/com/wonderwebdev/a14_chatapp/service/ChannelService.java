package com.wonderwebdev.a14_chatapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.wonderwebdev.a14_chatapp.repository.ChannelRepository;
import com.wonderwebdev.a14_chatapp.repository.ChatRepository;
import com.wonderwebdev.a14_chatapp.domain.Channel;
import com.wonderwebdev.a14_chatapp.domain.Chat;
import com.wonderwebdev.a14_chatapp.dto.ChannelDTO;
import com.wonderwebdev.a14_chatapp.dto.ChatDTO;
import com.wonderwebdev.a14_chatapp.mapper.ChannelMapper;
import com.wonderwebdev.a14_chatapp.mapper.ChatMapper;
@Service
public class ChannelService {
    
    private final ChannelRepository channelRepository;
    private final ChatRepository chatRepository;
    private final ChannelMapper channelMapper;
    private final ChatMapper chatMapper;

    public ChannelService(ChannelRepository channelRepository, ChatRepository chatRepository, ChannelMapper channelMapper, ChatMapper chatMapper) {
        this.channelRepository = channelRepository;
        this.chatRepository = chatRepository;
        this.channelMapper = channelMapper;
        this.chatMapper = chatMapper;
    }
    // Returns a ChannelDTO object by its ID
    public ChannelDTO findChannelById(Long id) {
        Channel channel = channelRepository.findById(id).orElse(null);
        return channelMapper.toDto(channel);
    }
// Updated to return List<ChannelDTO>
    public List<ChannelDTO> findAllChannels() {
        List<Channel> channels = channelRepository.findAll();
        return channels.stream()
                .map(channelMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<ChatDTO> findMessagesByChannelId(Long channelId) {
        List<Chat> messages =chatRepository.findByChannelId(channelId);
        return messages.stream()
                .map(chatMapper::toDto)
                .collect(Collectors.toList());
    }
    // Returns the number of users in a channel used by the #channelSelect card in index.html
    public int getParticipantCount(Long channelId) {
                    return channelRepository.findById(channelId)
                    .map(channel -> channel.getUsers().size())
                    .orElse(0); // Return 0 if channel is not found
        }
    }


