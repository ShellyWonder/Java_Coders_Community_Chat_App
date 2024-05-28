package com.wonderwebdev.a14_chatapp.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.wonderwebdev.a14_chatapp.domain.User;
import com.wonderwebdev.a14_chatapp.dto.UserDTO;
import com.wonderwebdev.a14_chatapp.mapper.UserMapper;
import com.wonderwebdev.a14_chatapp.repository.UserRepository;

@Service   
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Validate user credentials
    public UserDTO validateUser(String userName, String password) {
        User user = findUserByUserNameAndPassword(userName, password); 
        if (user != null && user.getPassword().equals(password)) {
            return UserMapper.INSTANCE.toDto(user); 
        }
        return null;
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
        response.put("user", UserMapper.INSTANCE.toDto(savedUser)); 
        return response;
    }

    // Get the current user
    public UserDTO getCurrentUser() {
        User user = userRepository.findById(1L).orElse(null);
        return UserMapper.INSTANCE.toDto(user);
    }

    // Private helper method to find user by username
    private User findUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }


    // Private helper method to find user by username AND password used by validateUser()
    private User findUserByUserNameAndPassword(String userName, String password) {
        return userRepository.findByUserNameAndPassword(userName, password);
    }
}