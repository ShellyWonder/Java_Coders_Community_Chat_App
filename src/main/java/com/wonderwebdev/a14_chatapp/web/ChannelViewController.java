package com.wonderwebdev.a14_chatapp.web;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.wonderwebdev.a14_chatapp.service.UserService;
import com.wonderwebdev.a14_chatapp.service.ChannelService;
import com.wonderwebdev.a14_chatapp.domain.Channel;
import com.wonderwebdev.a14_chatapp.domain.User;
import com.wonderwebdev.a14_chatapp.repository.ChannelRepository;

@Controller
public class ChannelViewController {
    
    private ChannelService channelService;
    private UserService userService;
    private ChannelRepository channelRepository;

    public ChannelViewController(ChannelService channelService, UserService userService, ChannelRepository channelRepository) {
        this.channelService = channelService;
        this.userService = userService;
        this.channelRepository = channelRepository;
    }

    @GetMapping("/channel/{id}")
    public String getChannel(@PathVariable Long id, Model model) {
        User user = userService.getCurrentUser();
        model.addAttribute("user", user);
        if(user == null) {
            return "redirect:/login";
        }
        Channel channel = channelService.findChannelById(id);
        model.addAttribute("channel", channel);
        return "channel";
    }

     //populates the index.html #channelSelect card with # of users in a channel   
    @GetMapping("/channel/{channelId}/participants/count/{currentChannelId}")
    public String getChannelUserCount(@PathVariable Long id, Model model) {
        Channel channel = channelRepository.findById(id).orElse(null);
        int participantCount = channelService.getParticipantCount(id);
        model.addAttribute("channel", channel);
        model.addAttribute("participantCount", participantCount);
        return "index";
    }
     
}
