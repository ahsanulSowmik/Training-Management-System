package com.tms.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tms.entity.User;
import com.tms.model.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class UserResponse {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMdd hh:mm:ss")
	private LocalDateTime timeStamp;
	private String message;
	private UserDto userDto;
	public UserResponse(String message, UserDto userDto) {
		this();
		this.message = message;
		this.userDto = userDto;
	}
	public UserResponse(){
		timeStamp = LocalDateTime.now();
	}
}
