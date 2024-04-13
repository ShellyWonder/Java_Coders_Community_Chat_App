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

    public List<Channel> findAll() {
        return channelRepository.findAll();
    }

    public int getParticipantCount(Long channelId) {
                    return channelRepository.findById(channelId)
                    .map(channel -> channel.getUsers().size())
                    .orElse(0); // Return 0 if channel is not found
        }
    }


