package com.wonderwebdev.a14_chatapp.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.wonderwebdev.a14_chatapp.domain.Channel;
import com.wonderwebdev.a14_chatapp.dto.ChannelDTO;
import com.wonderwebdev.a14_chatapp.dto.ChannelViewDTO;
import com.wonderwebdev.a14_chatapp.dto.ChatSummaryDTO;
import com.wonderwebdev.a14_chatapp.service.ChannelService;
import com.wonderwebdev.a14_chatapp.repository.ChannelRepository;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api")
public class ChannelRestController {
    
    private final ChannelService channelService;
    private final ChannelRepository channelRepository;

    public ChannelRestController(ChannelService channelService, ChannelRepository channelRepository) {
        this.channelService = channelService;
        this.channelRepository = channelRepository;
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

    //to serve channel view data
    @GetMapping("/channel/{id}/view")
    public ResponseEntity<ChannelViewDTO> getChannelViewData(@PathVariable Long id) {
        Optional<ChannelDTO> optionalChannelDTO = channelService.findChannelById(id);
        if (optionalChannelDTO.isPresent()) {
            ChannelDTO channelDTO = optionalChannelDTO.get();
            List<ChatSummaryDTO> messages = channelService.findMessagesByChannelId(id);
            int participantCount = channelService.getParticipantCount(id);
            ChannelViewDTO channelViewDTO = new ChannelViewDTO(channelDTO, messages, participantCount);
            return ResponseEntity.ok(channelViewDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
