package com.wonderwebdev.a14_chatapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wonderwebdev.a14_chatapp.repository.ChannelRepository;
import com.wonderwebdev.a14_chatapp.domain.Channel;
@Service
public class ChannelService {
    @Autowired
    private ChannelRepository channelRepository;

    public Channel findChannelById(Long id) {
        return channelRepository.findById(id).orElse(null);
    }

    public List<Channel> findAllChannels() {
        return channelRepository.findAll();
    }
    // Returns the number of users in a channel used by the #channelSelect card in index.html
    public int getParticipantCount(Long channelId) {
                    return channelRepository.findById(channelId)
                    .map(channel -> channel.getUsers().size())
                    .orElse(0); // Return 0 if channel is not found
        }
    }


