package com.wonderwebdev.a14_chatapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.wonderwebdev.a14_chatapp.repository.ChannelRepository;
import com.wonderwebdev.a14_chatapp.repository.ChatRepository;
import com.wonderwebdev.a14_chatapp.domain.Channel;
import com.wonderwebdev.a14_chatapp.domain.Chat;
@Service
public class ChannelService {
    
    private final ChannelRepository channelRepository;
    private final ChatRepository chatRepository;

    public ChannelService(ChannelRepository channelRepository, ChatRepository chatRepository) {
        this.channelRepository = channelRepository;
        this.chatRepository = chatRepository;
    }

    public Channel findChannelById(Long id) {
        return channelRepository.findById(id).orElse(null);
    }

    public List<Channel> findAllChannels() {
        return channelRepository.findAll();
    }

    public List<Chat> findMessagesByChannelId(Long channelId) {
        return chatRepository.findByChannelId(channelId);
    }
    // Returns the number of users in a channel used by the #channelSelect card in index.html
    public int getParticipantCount(Long channelId) {
                    return channelRepository.findById(channelId)
                    .map(channel -> channel.getUsers().size())
                    .orElse(0); // Return 0 if channel is not found
        }
    }


