package com.wonderwebdev.a14_chatapp.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.wonderwebdev.a14_chatapp.domain.Channel;
import com.wonderwebdev.a14_chatapp.dto.ChannelDTO;

@Mapper(componentModel = "spring")
public interface ChannelMapper {
    ChannelMapper INSTANCE = Mappers.getMapper(ChannelMapper.class);

    @Mapping(target = "messages", ignore = true)
       ChannelDTO toDto(Channel channel);

    @Mapping(target = "messages", ignore = true)
    
    Channel toEntity(ChannelDTO channelDTO);
}
