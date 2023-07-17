package com.tms.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tms.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class RoleResponse {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMdd hh:mm:ss")
	private LocalDateTime timeStamp;
	private String message;
	private String email;
	private Role roleDto;
	public RoleResponse(String message, String email, Role roleDto) {
		this();
		this.message = message;
		this.email = email;
		this.roleDto = roleDto;
	}
	public RoleResponse(){
		timeStamp = LocalDateTime.now();
	}
}
