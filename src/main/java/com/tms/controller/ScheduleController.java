package com.tms.controller;


import com.tms.request.AssignmentAnswerRequest;
import com.tms.request.AssignmentRemoveRequest;
import com.tms.request.AssignmentScheduleRequest;
import com.tms.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ScheduleController {

    @Autowired
    ScheduleService scheduleService;

    @PostMapping ("/api/schedule/add-assignment")
    public ResponseEntity<?> addAssignment( @RequestBody AssignmentScheduleRequest req) throws Exception {
        return new ResponseEntity<>(scheduleService.addAssignment(req.getAssignment(), req.getSchedule()), HttpStatus.OK);
    }
    @PostMapping ("/api/schedule/add-assignment-answer")
    public ResponseEntity<?> addAnswer(@RequestBody AssignmentAnswerRequest req) throws Exception {
        return new ResponseEntity<>(scheduleService.addAnswer(req.getAnswer(), req.getAssignmentId(), req.getBatchCode()), HttpStatus.OK);
    }
//    @PostMapping ("/api/schedule/add-assignment-answer-evaluate")
//    @PreAuthorize("hasRole('TRAINER')")
//    public ResponseEntity<?> answerEvaluate(@RequestHeader (name="Authorization") String token, @RequestBody EvaluateAnswerRequest req) throws Exception {
//        return new ResponseEntity<>(scheduleService.answerEvaluate(token, req.getAnswerId(), req.getEvaluation(), req.getBatchCode()), HttpStatus.OK);
//    }
    @PostMapping ("/api/schedule/remove-assignment")
    public ResponseEntity<?> removeAssignment(@RequestBody AssignmentRemoveRequest req) throws Exception {
        return new ResponseEntity<>(scheduleService.removeAssignment(req.getScheduleId(), req.getAssignmentId()), HttpStatus.OK);

    }
}
