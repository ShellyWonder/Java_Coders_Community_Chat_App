package com.wonderwebdev.a14_chatapp.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.wonderwebdev.a14_chatapp.domain.Channel;
import com.wonderwebdev.a14_chatapp.domain.Chat;
import com.wonderwebdev.a14_chatapp.service.ChannelService;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api")
public class ChannelRestController {
    
    private ChannelService channelService;

    public ChannelRestController(ChannelService channelService) {
        this.channelService = channelService;
    }

    @GetMapping("/channels")
       public List<Channel> getChannels() {
        return channelService.findAllChannels();
    }

    @GetMapping("/channel/{id}/messages")
    public List<Chat> getAllChannelMessages(@PathVariable Long id) {
        return channelService.findMessagesByChannelId(id);
    }
}
