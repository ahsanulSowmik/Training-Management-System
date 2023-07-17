package com.tms.service.implementation;

import com.tms.entity.*;
import com.tms.functional.UserDetails;
import com.tms.repository.*;
import com.tms.response.BatchResponse;
import com.tms.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ScheduleServiceImple implements ScheduleService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    RoleRepo roleRepo;

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private AssignmentRepo assignmentRepo;


    @Autowired
    private ScheduleRepo scheduleRepo;

    @Autowired
    private BatchRepo batchRepo;


    private final UserDetails userData = (email) -> {
        Optional<User> user = userRepo.findById(email);
        if(user.isPresent()) return user.get();
        return null;
    };
    @Override
    public BatchResponse addAssignment(Assignment assignment, Long scheduleId) throws Exception {
        Optional<Schedule> schedule = scheduleRepo.findById(scheduleId);
        if(schedule.isEmpty()) throw new Exception("Schedule not found");
        Optional<Batch> batchDB = batchRepo.findById(schedule.get().getBatchCode());
        if(batchDB.isEmpty()) throw new Exception("Batch not found: " + schedule.get().getBatchCode());
        Set<Assignment> assignments = schedule.get().getAssignments();
        assignments.add(assignment);
        schedule.get().setAssignments(assignments);
        scheduleRepo.save(schedule.get());
        batchDB = batchRepo.findById(schedule.get().getBatchCode());
        return new BatchResponse("Assignment added", batchDB.get());
    }

    @Override
    public BatchResponse addAnswer(AssignmentAnswer answer, Long assignmentId, String batchCode) throws Exception {
        Optional<Assignment> assignment = assignmentRepo.findById(assignmentId);
        if(assignment.isEmpty()) throw new Exception("Assignment not found");
        Set<AssignmentAnswer> assignmentAnswers = assignment.get().getAnswers();
        assignmentAnswers.add(answer);
        assignment.get().setAnswers(assignmentAnswers);
        assignmentRepo.save(assignment.get());
        Optional<Batch> batchDB = batchRepo.findById(batchCode);
        return new BatchResponse("Assignment added", batchDB.get());
    }

    @Override
    public BatchResponse removeAssignment(Long scheduleId, Long assignmentId) throws Exception {
        Optional<Schedule> schedule = scheduleRepo.findById(scheduleId);
        if(schedule.isEmpty()) throw new Exception("Schedule not found");
        Optional<Batch> batchDB = batchRepo.findById(schedule.get().getBatchCode());
        if(batchDB.isEmpty()) throw new Exception("Batch not found: " + schedule.get().getBatchCode());
        Set<Assignment> assignments = schedule.get().getAssignments();
        schedule.get().setAssignments(assignments.stream().filter(assignment -> !assignment.getAssignmentId().equals(assignmentId)).collect(Collectors.toSet()));
        scheduleRepo.save(schedule.get());
        batchDB = batchRepo.findById(schedule.get().getBatchCode());
        assignmentRepo.deleteById(assignmentId);
        return new BatchResponse("Assignment deleted", batchDB.get());
    }
}
