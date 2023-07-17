package com.tms.controller;


import com.tms.entity.Batch;
import com.tms.entity.Schedule;
import com.tms.request.BatchScheduleRequest;
import com.tms.request.BatchTraineeRequest;
import com.tms.service.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class BatchController {

    @Autowired
    BatchService batchService;


    @PostMapping ("/api/batch/create")
    public ResponseEntity<?> createBatch(@RequestBody Batch batch) throws Exception {
        return new ResponseEntity<>(batchService.createBatch(batch), HttpStatus.OK);
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

}
