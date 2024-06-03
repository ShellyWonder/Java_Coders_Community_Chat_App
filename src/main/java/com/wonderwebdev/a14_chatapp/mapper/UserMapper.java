package com.wonderwebdev.a14_chatapp.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import com.wonderwebdev.a14_chatapp.domain.User;
import com.wonderwebdev.a14_chatapp.dto.UserDTO;
import com.wonderwebdev.a14_chatapp.dto.UserSummaryDTO;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    // Map User to UserDTO, including channels
    @Mapping(target = "channels", source = "channels")
    UserDTO toDto(User user);

    // Map UserDTO to User
   
    User toEntity(UserDTO userDTO);

    // Map User to UserSummaryDTO, ignoring password
    
    @Mapping(target = "password", ignore = true)
    UserSummaryDTO toSummaryDto(User user);
}
