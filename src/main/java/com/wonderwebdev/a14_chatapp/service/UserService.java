package com.wonderwebdev.a14_chatapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wonderwebdev.a14_chatapp.domain.User;
import com.wonderwebdev.a14_chatapp.repository.UserRepository;

@Service   
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User validateUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }   
}
