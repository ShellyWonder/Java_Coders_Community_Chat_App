package com.wonderwebdev.a14_chatapp.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.wonderwebdev.a14_chatapp.domain.User;
import com.wonderwebdev.a14_chatapp.repository.UserRepository;

@Service   
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
}

    // Validate user credentials
    public User validateUser(String userName, String password) {
        User user = findUserByUserName(userName);
        System.out.println("Fetched User: " + user);
        if (user != null && user.getPassword().equals(password)) {
            return user;

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
        response.put("user", savedUser);
        return response;
    }

    // Get the current user
    public User getCurrentUser() {
        return userRepository.findById(1L).orElse(null);
    }
    // Private helper method to find user by username
    private User findUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }
}
