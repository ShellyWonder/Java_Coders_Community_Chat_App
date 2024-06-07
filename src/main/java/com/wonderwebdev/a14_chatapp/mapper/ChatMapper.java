package com.wonderwebdev.a14_chatapp.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.wonderwebdev.a14_chatapp.domain.Chat;
import com.wonderwebdev.a14_chatapp.dto.ChatDTO;
import com.wonderwebdev.a14_chatapp.dto.ChatSummaryDTO;

@Mapper(componentModel = "spring")
public interface ChatMapper {
    ChatMapper INSTANCE = Mappers.getMapper(ChatMapper.class);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "channel", ignore = true)
    ChatDTO toDto(Chat chat);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "channel", ignore = true)
    Chat toEntity(ChatDTO chatDTO);

    @Mapping(target = "userName", source = "user.userName")
    ChatSummaryDTO toSummaryDto(Chat chat);
}
