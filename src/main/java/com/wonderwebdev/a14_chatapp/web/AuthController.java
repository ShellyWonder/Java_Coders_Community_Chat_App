package com.wonderwebdev.a14_chatapp.web;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.wonderwebdev.a14_chatapp.domain.User;
import com.wonderwebdev.a14_chatapp.service.UserService;

@RestController
public class AuthController {
    
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User loginUser) {
        User user = userService.validateUser(loginUser.getUsername(), loginUser.getPassword());
        if (user != null) {
            // Generate a session or a simple token
            return ResponseEntity.ok(Map.of("authenticated", true, "userId", user.getId()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("authenticated", false));
        }
    }
}
