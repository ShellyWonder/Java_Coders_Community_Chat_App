package com.wonderwebdev.a14_chatapp.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.wonderwebdev.a14_chatapp.security.JwtUtil;
import com.wonderwebdev.a14_chatapp.service.SecurityUserDetailsService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

@Controller
public class ChannelViewController {
    private JwtUtil jwtUtil; 
    private SecurityUserDetailsService userDetailsService;

    public ChannelViewController(JwtUtil jwtUtil, SecurityUserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }


@GetMapping("/channel/{id}")
public String getChannelPage(@PathVariable Long id, @RequestParam("token") String token, Model model, HttpServletRequest request) {
    String username = jwtUtil.extractUsername(token);
    UserDetails userDetails = userDetailsService.loadUserByUsername(username);

    if (jwtUtil.validateToken(token, userDetails.getUsername())) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        model.addAttribute("channelId", id);
        return "channel"; // Return the view name
    } else {
        return "redirect:/login"; // Redirect to login if token is invalid
    }
}

}
