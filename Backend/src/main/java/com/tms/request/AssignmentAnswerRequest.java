package com.tms.request;

import com.tms.entity.AssignmentAnswer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentAnswerRequest {
	
	private AssignmentAnswer answer;
    private Long assignmentId;
    private String batchCode;
}
