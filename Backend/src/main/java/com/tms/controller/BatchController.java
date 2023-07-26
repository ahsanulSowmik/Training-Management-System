package com.tms.controller;


import com.tms.entity.Batch;
import com.tms.entity.Notice;
import com.tms.entity.Schedule;
import com.tms.request.BatchCreateRequest;
import com.tms.request.BatchScheduleRequest;
import com.tms.request.BatchTraineeRequest;
import com.tms.service.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class BatchController {

    @Autowired
    BatchService batchService;


    @PostMapping ("/api/batch/create")
    public ResponseEntity<?> createBatch(@RequestBody BatchCreateRequest batchCreateRequest) throws Exception {
        return new ResponseEntity<>(batchService.createBatch(batchCreateRequest), HttpStatus.OK);
    }

    @GetMapping ("/api/batch/get/all")
    public ResponseEntity<?> getAllBatch() throws Exception {
        return new ResponseEntity<>(batchService.getAllBatchData(), HttpStatus.OK);
    }

    @PostMapping ("/api/batch/add-schedule")
    public ResponseEntity<?> addScheduleToBatch( @RequestBody Schedule schedule) throws Exception {
        return new ResponseEntity<>(batchService.addScheduleToBatch(schedule), HttpStatus.OK);
    }

    @PostMapping ("/api/batch/remove-schedule")
    public ResponseEntity<?> removeScheduleFromBatch( @RequestBody BatchScheduleRequest schedule) throws Exception {
        return new ResponseEntity<>(batchService.removeScheduleFromBatch(schedule.getScheduleId()), HttpStatus.OK);
    }

    @PostMapping ("/api/batch/add-trainee")
    public ResponseEntity<?> addTraineeToBatch( @RequestBody BatchTraineeRequest req) throws Exception {
        return new ResponseEntity<>(batchService.addTraineeToBatch(req.getEmail(), req.getBatchCode()), HttpStatus.OK);
    }

    @GetMapping ("/api/batch/get/{batchCode}")
    public ResponseEntity<?> getUser(@PathVariable String batchCode) throws Exception {
        return new ResponseEntity<>(batchService.getBatch(batchCode), HttpStatus.OK);
    }

    @GetMapping("api/batch/get-by-mail/{traineeEmail}")
    public List<Batch> getBatchesByTraineeEmail(@PathVariable String traineeEmail) {
        return batchService.findBatchesByTraineeEmail(traineeEmail);
    }

    @GetMapping("api/batch/get-by-trainer-mail/{trainerEmail}")
    public List<Batch> getBatchesByTrainerEmail(@PathVariable String trainerEmail) {
        return batchService.getBatchesByTrainerEmail(trainerEmail);
    }


    @PostMapping("api/batch/create-notice")
    public ResponseEntity<?> createNotice(@RequestBody Notice notice) {
        return new ResponseEntity<>(batchService.createNotice(notice), HttpStatus.OK);
    }

    @DeleteMapping("api/batch/remove-notice/{noticeId}")
    public void removeNotice(@PathVariable Long noticeId) throws Exception {
        batchService.removeNoticeById(noticeId);
    }

    @GetMapping("api/batch/get-all-notice")
    public ResponseEntity<?> getNotice() {
        return new ResponseEntity<>(batchService.getAllNotice(), HttpStatus.OK);
    }

    @GetMapping("api/batch/get-trainer's-schedules/{trainerEmail}")
    public ResponseEntity<?> getTrainerSchedules(@PathVariable String trainerEmail) {
        return new ResponseEntity<>(batchService.getTrainerSchedules(trainerEmail), HttpStatus.OK);
    }

}
