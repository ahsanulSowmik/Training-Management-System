package com.tms.service;

import com.tms.entity.Assignment;
import com.tms.entity.AssignmentAnswer;
import com.tms.response.BatchResponse;
import org.springframework.stereotype.Service;

@Service
public interface ScheduleService {
    public BatchResponse addAssignment(Assignment assignment, Long scheduleId)  throws Exception;

    public BatchResponse addAnswer(AssignmentAnswer answer, Long assignmentId, String batchCode)  throws Exception;

    public BatchResponse removeAssignment(Long scheduleId, Long assignmentId) throws Exception;

}
