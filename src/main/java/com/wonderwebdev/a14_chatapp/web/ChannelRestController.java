package com.wonderwebdev.a14_chatapp.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.wonderwebdev.a14_chatapp.dto.ChannelDTO;
import com.wonderwebdev.a14_chatapp.dto.ChatSummaryDTO;
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
     public ResponseEntity<List<ChannelDTO>> getAllChannels() {
        try {
            logger.info("Getting all channels");
            List<ChannelDTO> channels = channelService.findAllChannels().stream()
                    .map(channel -> new ChannelDTO(channel.getId(), channel.getName(), channel.getDescription()))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(channels);
        } catch (Exception e) {
            logger.error("Error occurred while fetching channels", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
               
    @GetMapping("/channel/{id}/messages") 
    public List<ChatSummaryDTO> getAllChannelMessages(@PathVariable Long id) {
        logger.info("Fetching messages for channel ID: {}", id);
        List<ChatSummaryDTO> messages = channelService.findMessagesByChannelId(id);
        logger.info("Fetched messages: {}", messages);
        return messages;
    }
}
