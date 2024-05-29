package com.wonderwebdev.a14_chatapp.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.wonderwebdev.a14_chatapp.dto.ChannelDTO;
import com.wonderwebdev.a14_chatapp.dto.ChatDTO;
import com.wonderwebdev.a14_chatapp.service.ChannelService;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api")
public class ChannelRestController {
    private final Logger logger = LoggerFactory.getLogger(ChannelRestController.class);
    
    private ChannelService channelService;

    public ChannelRestController(ChannelService channelService) {
        this.channelService = channelService;
    }

    @GetMapping("/channels")
       public List<ChannelDTO> getChannels() {
        logger.info("Getting all channels");
        List<ChannelDTO> channels = channelService.findAllChannels();
        if (channelService.findAllChannels().isEmpty()) {
            logger.error("No channels found");
        }
        return channels;
    }

    @GetMapping("/channel/{id}/messages")
    public List<ChatDTO> getAllChannelMessages(@PathVariable Long id) {
        logger.info("Fetching messages for channel ID: {}", id);
        List<ChatDTO> messages = channelService.findMessagesByChannelId(id);
        logger.info("Fetched messages: {}", messages);
        return messages;
    }
}
