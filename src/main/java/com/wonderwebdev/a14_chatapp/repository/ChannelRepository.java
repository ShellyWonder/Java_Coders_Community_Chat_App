package com.wonderwebdev.a14_chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wonderwebdev.a14_chatapp.domain.Channel;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, Long>{

}
