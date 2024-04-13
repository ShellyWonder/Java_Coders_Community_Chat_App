package com.wonderwebdev.a14_chatapp.web;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.wonderwebdev.a14_chatapp.service.ChannelService;
import com.wonderwebdev.a14_chatapp.domain.Channel;
import com.wonderwebdev.a14_chatapp.repository.ChannelRepository;

@Controller
public class ChannelController {
    @Autowired
    private ChannelService channelService;
    private ChannelRepository channelRepository;

    @GetMapping("/channel")
    public String showAvailableChannels(Model model) {
        List<Channel> channels = channelService.findAll();
        model.addAttribute("channels", channels);
        return "index";
    }
    
    
    @GetMapping("/channel/{id}")
    public String getChannelUserCount(@PathVariable Long id, Model model) {
        Channel channel = channelRepository.findById(id).orElse(null);
        int participantCount = channelService.getParticipantCount(id);
        model.addAttribute("channel", channel);
        model.addAttribute("participantCount", participantCount);
        return "index";
    }
}
