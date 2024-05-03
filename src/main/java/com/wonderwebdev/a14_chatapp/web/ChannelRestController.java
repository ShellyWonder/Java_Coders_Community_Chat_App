package com.wonderwebdev.a14_chatapp.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.wonderwebdev.a14_chatapp.domain.Channel;
import com.wonderwebdev.a14_chatapp.service.ChannelService;

@RestController
public class ChannelRestController {
    
    private ChannelService channelService;

    public ChannelRestController(ChannelService channelService) {
        this.channelService = channelService;
    }

    // This endpoint returns JSON data for #channelSelect 
    @GetMapping("/channels")
       public List<Channel> getChannels() {
        return channelService.findAllChannels();
    }
}
