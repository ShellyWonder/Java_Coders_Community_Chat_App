package com.wonderwebdev.a14_chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import com.wonderwebdev.a14_chatapp.domain.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByChannelId(Long channelId);
}
