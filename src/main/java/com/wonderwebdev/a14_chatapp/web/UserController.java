package com.wonderwebdev.a14_chatapp.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.wonderwebdev.a14_chatapp.domain.User;

import org.springframework.ui.Model;

@Controller
// Note: user login being handled by the AuthController class because it requires a RESTful API
public class UserController {
    @GetMapping("/")
	public String home(Model model) {
		System.out.println("Home controller method called");
		model.addAttribute("user", new User());
		return "index";
	}
}
