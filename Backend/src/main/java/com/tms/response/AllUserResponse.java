package com.tms.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tms.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AllUserResponse {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyyMMdd hh:mm:ss")
	private LocalDateTime timeStamp;
	private String message;
	private List<User> users;
	private int previousBatches;
	private int runningBatches;
	private int upcomingBatches;
	private int previousCourses;
	private int runningCourses;
	private int upcomingCourses;
	public AllUserResponse(String message, List<User> users) {
		this();
		this.message = message;
		this.users = users;


	}
	public AllUserResponse(){
		timeStamp = LocalDateTime.now();
	}
}
