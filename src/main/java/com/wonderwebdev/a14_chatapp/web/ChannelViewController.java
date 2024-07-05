package com.wonderwebdev.a14_chatapp.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@Controller
public class ChannelViewController {

@GetMapping("/channel/{id}")
public String getChannelPage(@PathVariable Long id, Model model) {
    model.addAttribute("channelId", id);
    return "channel";
}

}
