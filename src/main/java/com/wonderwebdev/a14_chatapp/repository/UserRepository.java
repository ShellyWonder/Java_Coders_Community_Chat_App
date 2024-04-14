package com.wonderwebdev.a14_chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wonderwebdev.a14_chatapp.domain.User;

public interface UserRepository  extends JpaRepository<User, Long>{
   User findByUsername(String username); 
}
