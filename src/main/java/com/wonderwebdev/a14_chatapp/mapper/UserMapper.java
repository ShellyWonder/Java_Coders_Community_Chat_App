package com.wonderwebdev.a14_chatapp.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.wonderwebdev.a14_chatapp.domain.User;
import com.wonderwebdev.a14_chatapp.dto.UserDTO;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "channels", source = "channels")
    UserDTO toDto(User user);

    @Mapping(target = "channels", source = "channels")
    User toEntity(UserDTO userDTO);
}
