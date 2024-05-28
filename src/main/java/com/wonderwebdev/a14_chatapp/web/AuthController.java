package com.wonderwebdev.a14_chatapp.web;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wonderwebdev.a14_chatapp.domain.User;
import com.wonderwebdev.a14_chatapp.dto.UserDTO;
import com.wonderwebdev.a14_chatapp.service.UserService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
        
    private UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody UserDTO loginUserDTO) {
        UserDTO userDTO = userService.validateUser(loginUserDTO.getUserName(), loginUserDTO.getPassword());
        
            if ((userDTO != null)) {
                return ResponseEntity.ok(Map.of("authenticated", true, "userId", userDTO.getId()));
            } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("authenticated", false));
            }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody User newUser) {
        try {
            Map<String, Object> registeredUser = userService.registerNewUser(newUser);
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
}
