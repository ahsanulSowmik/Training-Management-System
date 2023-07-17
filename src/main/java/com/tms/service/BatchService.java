package com.tms.service;

import com.tms.entity.Batch;
import com.tms.entity.Schedule;
import com.tms.response.BatchResponse;
import com.tms.response.BatchesResponse;

import java.util.List;

public interface BatchService {

    public BatchResponse createBatch(Batch batch) throws Exception;

    public BatchResponse addTraineeToBatch(String email, String batchCode)  throws Exception;

    public BatchesResponse getAllBatchData() throws Exception;

    public BatchResponse addScheduleToBatch(Schedule schedule)  throws Exception;

    public BatchResponse removeScheduleFromBatch(Long scheduleId)  throws Exception;

    public BatchResponse getBatch(String batchCode) throws Exception;

    List<Batch> findBatchesByTraineeEmail(String traineeEmail);

    public BatchResponse removeTraineeFromBatch(String email, String batchCode)  throws Exception;
}
