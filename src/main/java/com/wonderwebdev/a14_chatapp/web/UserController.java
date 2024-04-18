package com.wonderwebdev.a14_chatapp.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
// Note: user login being handled by the AuthController class
public class UserController {
    @GetMapping("/")
	public String home() {
		System.out.println("Home controller method called");
		return "index";
	}
}
