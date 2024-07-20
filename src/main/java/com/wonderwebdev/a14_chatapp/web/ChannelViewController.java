package com.wonderwebdev.a14_chatapp.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.wonderwebdev.a14_chatapp.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;

@Controller
public class ChannelViewController {
    private AuthenticationService authenticationService;

    public ChannelViewController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;

    }

    @GetMapping("/channel/{id}")
    public String getChannelPage(@PathVariable Long id, @RequestParam("token") String token, Model model,
            HttpServletRequest request) {
        if (authenticationService.authenticateUser(token, request)) {
            model.addAttribute("channelId", id);
            return "channel"; // Return the view name
        } else {
            return "redirect:/login"; // Redirect to login if token is invalid
        }
    }

}
