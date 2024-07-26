package com.wonderwebdev.a14_chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import java.util.List;
import java.util.Optional;

import com.wonderwebdev.a14_chatapp.domain.Chat;
public interface ChatRepository extends JpaRepository<Chat, Long> {

    // Method to find all chat messages by channel ID
    List<Chat> findByChannelId(Long channelId);

    // Method to find a single chat message by channel and its ID
    @NonNull
    Optional<Chat> findByChannelIdAndId(@NonNull Long channelId, @NonNull Long id);
    
}