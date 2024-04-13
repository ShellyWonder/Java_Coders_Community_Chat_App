package com.wonderwebdev.a14_chatapp.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wonderwebdev.a14_chatapp.service.ChannelService;


@RestController
@RequestMapping("/api")
public class ScheduledTaskController {
    private final ChannelService channelService;
    
    
    public ScheduledTaskController(ChannelService channelService) {
        this.channelService = channelService;
    }
    @GetMapping("/channels/{channelId}/participants/count")
    public ResponseEntity<Integer> getParticipantCount(@PathVariable Long channelId) {
        int count = channelService.getParticipantCount(channelId);
        return ResponseEntity.ok(count);
    }
}
