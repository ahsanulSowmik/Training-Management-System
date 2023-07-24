package com.tms.service;

import com.tms.entity.Batch;
import com.tms.entity.Notice;
import com.tms.entity.Schedule;
import com.tms.request.BatchCreateRequest;
import com.tms.response.BatchResponse;
import com.tms.response.BatchesResponse;

import java.util.List;
import java.util.Set;

public interface BatchService {

    public BatchResponse createBatch(BatchCreateRequest batchCreateRequest) throws Exception;

    public BatchResponse addTraineeToBatch(String email, String batchCode)  throws Exception;

    public BatchesResponse getAllBatchData() throws Exception;

    public BatchResponse addScheduleToBatch(Schedule schedule)  throws Exception;

    public BatchResponse removeScheduleFromBatch(Long scheduleId)  throws Exception;

    public BatchResponse getBatch(String batchCode) throws Exception;

    List<Batch> findBatchesByTraineeEmail(String traineeEmail);

    public Notice createNotice(Notice notice);


    public void removeNoticeById(Long noticeId);

    public List<Notice> getAllNotice();

    public List<Batch> getBatchesByTrainerEmail(String trainerEmail);

    public Set<Schedule> getTrainerSchedules(String trainerEmail);

    public BatchResponse removeTraineeFromBatch(String email, String batchCode)  throws Exception;
}
