package com.tms.request;

import com.tms.entity.Assignment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentScheduleRequest {
	
	private Assignment assignment;
    private Long schedule;
}
