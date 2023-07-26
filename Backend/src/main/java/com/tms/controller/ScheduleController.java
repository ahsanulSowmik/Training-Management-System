package com.tms.controller;


import com.tms.request.AddMarkRequest;
import com.tms.request.AssignmentAnswerRequest;
import com.tms.request.AssignmentRemoveRequest;
import com.tms.request.AssignmentScheduleRequest;
import com.tms.service.ScheduleService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/api/schedule/assignment/{assignmentId}/all-answer")
    public ResponseEntity<?> getAllAnswer(@PathVariable Long assignmentId) throws Exception {
        return new ResponseEntity<>(scheduleService.getAnswersByAssignmentId(assignmentId), HttpStatus.OK);
    }
    @PostMapping ("/api/schedule/add-assignment-answer-evaluate")
    public ResponseEntity<?> answerEvaluate(@RequestBody AddMarkRequest req) throws Exception {
        return new ResponseEntity<>(scheduleService.answerEvaluate(req.getAnswerId(), req.getEvaluation()), HttpStatus.OK);
    }
    @PostMapping ("/api/schedule/remove-assignment")
    public ResponseEntity<?> removeAssignment(@RequestBody AssignmentRemoveRequest req) throws Exception {
        return new ResponseEntity<>(scheduleService.removeAssignment(req.getScheduleId(), req.getAssignmentId()), HttpStatus.OK);

    }
}
