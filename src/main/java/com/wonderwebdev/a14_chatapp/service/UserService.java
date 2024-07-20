package com.wonderwebdev.a14_chatapp.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.wonderwebdev.a14_chatapp.domain.User;
import com.wonderwebdev.a14_chatapp.dto.UserDTO;
import com.wonderwebdev.a14_chatapp.dto.UserSummaryDTO;
import com.wonderwebdev.a14_chatapp.mapper.UserMapper;
import com.wonderwebdev.a14_chatapp.mapper.ChannelMapper;
import com.wonderwebdev.a14_chatapp.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final ChannelMapper channelMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper, ChannelMapper channelMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.channelMapper = channelMapper;
    }

    // Register a new user
    public Map<String, Object> registerNewUser(User newUser) {
        Map<String, Object> response = new HashMap<>();
        if (findUserByUserName(newUser.getUserName()) != null) {
            response.put("success", false);
            response.put("message", "Username already exists.");
            return response;
        }
        // Save the new user if username is not taken
        User savedUser = userRepository.save(newUser);
        response.put("success", true);
        response.put("message", "User registered successfully.");
        response.put("user", mapToUserDTO(savedUser));
        return response;
    }

    // Get the current user
    public UserDTO getCurrentUser() {
        User user = userRepository.findById(1L).orElse(null);
        return mapToUserDTO(user);
    }

    public User fetchUserById(Long userId) {
        return userRepository.findById(userId)
                             .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Private helper method to find user by username
    private User findUserByUserName(String userName) {
        return userRepository.findByUsername(userName);
    }

    // Map User to UserDTO, including channels
    private UserDTO mapToUserDTO(User user) {
        UserDTO userDTO = userMapper.toDto(user);

        userDTO.setChannels(
                user.getChannels().stream()
                        .map(channelMapper::toSummaryDto)
                        .collect(Collectors.toSet()));

        return userDTO;
    }

    // Get the participant count for a channel
    public int getParticipantCount(Long channelId) {
        return userRepository.findUsersByChannelId(channelId).size();
    }

    // Find users by channel ID
    public List<UserSummaryDTO> findUsersByChannelId(Long channelId) {
        return userRepository.findUsersByChannelId(channelId).stream()
                .map(userMapper::toSummaryDto)
                .collect(Collectors.toList());
    }

}
