package com.wonderwebdev.a14_chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wonderwebdev.a14_chatapp.domain.Message;

public interface MessageRepository extends JpaRepository<Message, Long>{
    
}
