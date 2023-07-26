package com.tms.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tms.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMdd hh:mm:ss")
	private LocalDateTime timeStamp;
	private String message;
	private User user;
    private String jwtToken;
	public AuthResponse(String message, User user, String jwtToken) {
		this();
		this.message = message;
		this.user = user;
		this.jwtToken = jwtToken;
	}
	public AuthResponse(){
		timeStamp = LocalDateTime.now();
	}
}
