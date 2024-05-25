package com.wonderwebdev.a14_chatapp.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.wonderwebdev.a14_chatapp.domain.User;
import com.wonderwebdev.a14_chatapp.dto.UserDTO;

@Mapper(componentModel = "spring")
public interface UserMapper {
UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
UserDTO toDto(User user);
}
