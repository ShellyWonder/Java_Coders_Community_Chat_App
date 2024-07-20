package com.wonderwebdev.a14_chatapp.service;

import com.wonderwebdev.a14_chatapp.domain.User;
import com.wonderwebdev.a14_chatapp.dto.UserDTO;
import com.wonderwebdev.a14_chatapp.mapper.UserMapper;
import com.wonderwebdev.a14_chatapp.repository.UserRepository;
import com.wonderwebdev.a14_chatapp.security.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private JwtUtil jwtUtil;

    private SecurityUserDetailsService userDetailsService;

    private UserRepository userRepository;

    private UserMapper userMapper;

    public AuthenticationService(JwtUtil jwtUtil, SecurityUserDetailsService userDetailsService,
            UserRepository userRepository, UserMapper userMapper) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public boolean authenticateUser(String token, HttpServletRequest request) {
        String username = jwtUtil.extractUsername(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (jwtUtil.validateToken(token, userDetails.getUsername())) {
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return true;
        } else {
            return false;
        }
    }

    public UserDTO validateUser(String userName, String password) {
        User user = findUserByUserNameAndPassword(userName, password);
        if (user != null && user.getPassword().equals(password)) {
            return userMapper.toDto(user);
        }
        return null;
    }

    private User findUserByUserNameAndPassword(String userName, String password) {
        return userRepository.findByUserNameAndPassword(userName, password);
    }
}
