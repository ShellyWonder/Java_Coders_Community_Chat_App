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

    // Map User to UserDTO, channels mapping handled manually
    @Mapping(target = "channels", ignore = true)
    UserDTO toDto(User user);

    // Map UserDTO to User, channels mapping handled manually
    @Mapping(target = "channels", ignore = true)
    User toEntity(UserDTO userDTO);

    // Map User to UserSummaryDTO
    UserSummaryDTO toSummaryDto(User user);
}
