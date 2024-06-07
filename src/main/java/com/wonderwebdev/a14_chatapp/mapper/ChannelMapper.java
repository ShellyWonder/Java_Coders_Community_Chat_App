package com.wonderwebdev.a14_chatapp.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.wonderwebdev.a14_chatapp.domain.Channel;
import com.wonderwebdev.a14_chatapp.dto.ChannelDTO;
import com.wonderwebdev.a14_chatapp.dto.ChannelSummaryDTO;

@Mapper(componentModel = "spring")
public interface ChannelMapper {
    ChannelMapper INSTANCE = Mappers.getMapper(ChannelMapper.class);

    @Mapping(target = "messages", ignore = true)
    @Mapping(target = "users", ignore = true)
    ChannelDTO toDto(Channel channel);

    @Mapping(target = "messages", ignore = true)
    @Mapping(target = "users", ignore = true)
    Channel toEntity(ChannelDTO channelDTO);

    ChannelSummaryDTO toSummaryDto(Channel channel);
}
