package com.wonderwebdev.a14_chatapp.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wonderwebdev.a14_chatapp.domain.User;
import com.wonderwebdev.a14_chatapp.dto.UserDTO;
import com.wonderwebdev.a14_chatapp.security.JwtUtil;
import com.wonderwebdev.a14_chatapp.service.UserService;
import com.wonderwebdev.a14_chatapp.service.AuthenticationService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
        
    private UserService userService;
    private JwtUtil jwtUtil;
    private AuthenticationService authenticationService;

    public AuthController(UserService userService, JwtUtil jwtUtil, AuthenticationService authenticationService) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody UserDTO loginUserDTO) {
        UserDTO userDTO = authenticationService.validateUser(loginUserDTO.getUserName(), loginUserDTO.getPassword());
        if (userDTO != null) {
            String token = jwtUtil.generateToken(userDTO.getUserName());
            Map<String, Object> response = new HashMap<>();
            response.put("authenticated", true);
            response.put("token", token);
            return ResponseEntity.ok(response);
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
