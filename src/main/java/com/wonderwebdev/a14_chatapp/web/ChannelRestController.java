package com.wonderwebdev.a14_chatapp.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.wonderwebdev.a14_chatapp.domain.Channel;
import com.wonderwebdev.a14_chatapp.dto.ChannelDTO;
import com.wonderwebdev.a14_chatapp.dto.ChannelViewDTO;
import com.wonderwebdev.a14_chatapp.dto.ChatSummaryDTO;
import com.wonderwebdev.a14_chatapp.dto.ChatMessageDTO;
import com.wonderwebdev.a14_chatapp.service.ChannelService;
import com.wonderwebdev.a14_chatapp.service.ChatService;
import com.wonderwebdev.a14_chatapp.repository.ChannelRepository;
import com.wonderwebdev.a14_chatapp.mapper. ChatMapper;


import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/api")
public class ChannelRestController {
    
    private final ChannelService channelService;
    private final ChannelRepository channelRepository;
    private final ChatService chatService;
    private final ChatMapper chatMapper;

    public ChannelRestController(ChannelService channelService, ChatService chatService, ChannelRepository channelRepository, ChatMapper chatMapper) {
        this.channelService = channelService;
        this.chatService = chatService;
        this.channelRepository = channelRepository;
        this.chatMapper = chatMapper;
    }

    // Existing endpoint to fetch all channels
    @GetMapping("/channels")
    public ResponseEntity<List<ChannelDTO>> getAllChannels() {
        List<ChannelDTO> channels = channelService.findAllChannels().stream()
                .map(channel -> new ChannelDTO(channel.getId(), channel.getName(), channel.getDescription()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(channels);
    }

    //fetch channel details
    @GetMapping("/channel/{id}")
    public ResponseEntity<ChannelDTO> getChannelDetails(@PathVariable Long id) {
        return channelService.findChannelById(id)
            .map(channel -> new ChannelDTO(channel.getId(), channel.getName(), channel.getDescription()))
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Existing endpoint to fetch messages
    @GetMapping("/channel/{id}/messages")
    public ResponseEntity<List<ChatSummaryDTO>> getAllChannelMessages(@PathVariable Long id) {
        List<ChatSummaryDTO> messages = channelService.findMessagesByChannelId(id);
        return ResponseEntity.ok(messages);
    }

    // to fetch participant count
    @GetMapping("/channel/{id}/participants/count")
    public ResponseEntity<Integer> getChannelUserCount(@PathVariable Long id) {
        Channel channel = channelRepository.findById(id).orElse(null);
        if (channel == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(0);
        }
        int participantCount = channelService.getParticipantCount(id);
        return ResponseEntity.ok(participantCount);
    }

    // To serve channel view data
    @GetMapping("/channel/{id}/view")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ChannelViewDTO> getChannelViewData(@PathVariable Long id) {
        Optional<ChannelDTO> optionalChannelDTO = channelService.findChannelById(id);
        if (optionalChannelDTO.isPresent()) {
            ChannelDTO channelDTO = optionalChannelDTO.get();
            List<ChatSummaryDTO> messages = chatService.getMessagesByChannelId(id)
                .stream()
                .map(chatMapper::messageDtoToSummaryDto)
                .collect(Collectors.toList());
            
            // Use chatService to get messages
            int participantCount = channelService.getParticipantCount(id);
            ChannelViewDTO channelViewDTO = new ChannelViewDTO(channelDTO, messages, participantCount);
            return ResponseEntity.ok(channelViewDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/channel/{channelId}/message")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ChatMessageDTO> sendMessage(@PathVariable Long channelId, @RequestBody ChatMessageDTO message) {
        ChatMessageDTO savedMessage = chatService.sendMessage(channelId, message);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMessage);
    }
}
