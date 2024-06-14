package com.wonderwebdev.a14_chatapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.wonderwebdev.a14_chatapp.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
   @Query("SELECT u FROM User u WHERE u.userName = :userName")
    User findByUsername(@Param("userName") String userName);

    @Query("SELECT u FROM User u WHERE u.userName = :userName AND u.password = :password")
    User findByUserNameAndPassword(@Param("userName") String userName, @Param("password") String password);

   // Find users by channel ID
   @Query("SELECT u FROM User u JOIN u.channels c WHERE c.id = :channelId")
   List<User> findUsersByChannelId(@Param("channelId") Long channelId);
}
