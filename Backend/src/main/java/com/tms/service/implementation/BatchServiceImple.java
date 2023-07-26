package com.tms.service.implementation;

import com.tms.entity.*;
import com.tms.exceptions.ResourceNotFoundException;
import com.tms.functional.UserDetails;
import com.tms.repository.*;
import com.tms.request.BatchCreateRequest;
import com.tms.response.BatchResponse;
import com.tms.response.BatchesResponse;
import com.tms.service.BatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class BatchServiceImple implements BatchService {

    @Autowired
    private BatchRepo batchRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ScheduleRepo scheduleRepo;

    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    ClassroomRepository classroomRepo;

    @Autowired
    NoticeRepo noticeRepo;


    private final UserDetails userData = (email) -> {
        Optional<User> user = Optional.ofNullable(userRepo.findById(email).orElseThrow(() -> new ResourceNotFoundException("User", "Email", email)));
        if (user.isPresent()) return user.get();
        return null;
    };


    @Override
    public BatchResponse createBatch(BatchCreateRequest batchCreateRequest) throws Exception {
        String batchCode = batchCreateRequest.getBatchCode();

        batchRepo.findById(batchCode).ifPresent(existingBatch -> {
            throw new RuntimeException("Batch already exists: " + batchCode);
        });

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate startDate = LocalDate.parse(batchCreateRequest.getStartDate(), formatter);
        LocalDate endDate = LocalDate.parse(batchCreateRequest.getEndDate(), formatter);

        if (startDate.isAfter(endDate)) {
            throw new RuntimeException("Start date cannot be greater than End date");
        }

        Classroom classroom = new Classroom();
        classroom.setName(batchCreateRequest.getName());
        classroom.setBatchCode(batchCode);
        Classroom savedClassroom = classroomRepo.save(classroom);

        Batch batch = new Batch();
        batch.setBatchCode(batchCode);
        batch.setName(batchCreateRequest.getName());
        batch.setDescription(batchCreateRequest.getDescription());
        batch.setStartDate(batchCreateRequest.getStartDate());
        batch.setEndDate(batchCreateRequest.getEndDate());
        batch.setTrainees(batchCreateRequest.getTrainees());
        batch.setClassroom(savedClassroom);
        Batch savedBatch = batchRepo.save(batch);

        return new BatchResponse("Batch Created Successfully.", savedBatch);
    }

    @Override
    public BatchResponse addTraineeToBatch(String email, String batchCode) throws Exception {

        Batch batchDB = batchRepo.findById(batchCode).orElseThrow(() -> new ResourceNotFoundException("Batch", "batch code", batchCode));

        User user = this.userRepo.findById(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "Email", email));

        if (batchDB.getTrainees().contains(email)) {
            throw new Exception("Trainee already added to " + batchCode);
        }

        if (!user.getRole().stream().anyMatch(role -> role.getRoleName().equals("TRAINEE")))
            throw new Exception("User does have Trainee role: " + email);
        Set<String> trainees = batchDB.getTrainees();
        trainees.add(email);
        batchDB.setTrainees(trainees);
        batchRepo.save(batchDB);
        return new BatchResponse("Trainee added", batchDB);
    }

    @Override
    public BatchesResponse getAllBatchData() throws Exception {
        List<Batch> batches = batchRepo.findAll();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String currentDate = LocalDate.now().format(formatter);

        List<Batch> previous = batches.stream().filter(batch -> LocalDate.parse(currentDate, formatter).isAfter(LocalDate.parse(batch.getEndDate(), formatter))).collect(Collectors.toList());

        List<Batch> running = batches.stream().filter(batch -> !LocalDate.parse(batch.getStartDate(), formatter).isAfter(LocalDate.parse(currentDate, formatter)) && !LocalDate.parse(currentDate, formatter).isAfter(LocalDate.parse(batch.getEndDate(), formatter))).collect(Collectors.toList());

        List<Batch> upcoming = batches.stream().filter(batch -> LocalDate.parse(currentDate, formatter).isBefore(LocalDate.parse(batch.getStartDate(), formatter))).collect(Collectors.toList());


        return new BatchesResponse("Batches", previous, running, upcoming);

    }

    @Override
    public BatchResponse addScheduleToBatch(Schedule schedule) throws Exception {

        Batch batchDB = batchRepo.findById(schedule.getBatchCode()).orElseThrow(() -> new ResourceNotFoundException("Batch", "batch code", schedule.getBatchCode()));

        Course courseDB = courseRepo.findById(schedule.getCourseCode()).orElseThrow(() -> new ResourceNotFoundException("Course", "course code", schedule.getCourseCode()));



        User user = userData.getUser(schedule.getTrainerEmail());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if (LocalDate.parse(schedule.getStartDate(), formatter).isAfter(LocalDate.parse(schedule.getEndDate(), formatter)))
            throw new Exception("Start date can never be greater than End date");

        if(user == null) throw new ResourceNotFoundException("User", "Not found by email", schedule.getTrainerEmail());
        if (!user.getRole().stream().anyMatch(role -> role.getRoleName().equals("TRAINER")))
            throw new Exception("User does have Trainer role: " + schedule.getTrainerEmail());

        Set<Schedule> schedules = batchDB.getSchedules();
        Set<Schedule> trainerSchedules = scheduleRepo.findByTrainerEmail(schedule.getTrainerEmail());

        scheduleOverlapChecker(schedules, schedule, "This Schedule time is already exist.");

        scheduleOverlapChecker(trainerSchedules, schedule, "Schedule time match with Trainer's schedule");
        schedules.add(schedule);

        batchDB.setSchedules(schedules);
        batchRepo.save(batchDB);
        return new BatchResponse("Schedule added to " + batchDB.getName(), batchDB);
    }

    @Override
    public BatchResponse removeScheduleFromBatch(Long scheduleId) throws Exception {
        Optional<Schedule> schedule = scheduleRepo.findById(scheduleId);
        if (schedule.isEmpty()) throw new Exception("Schedule not found");
        Optional<Batch> batchDB = batchRepo.findById(schedule.get().getBatchCode());
        if (batchDB.isEmpty()) throw new Exception("Batch not found: " + schedule.get().getBatchCode());
        Set<Schedule> schedules = batchDB.get().getSchedules().stream().filter(s -> !s.getScheduleId().equals(scheduleId)).collect(Collectors.toSet());
        batchDB.get().setSchedules(schedules);
        batchRepo.save(batchDB.get());
        scheduleRepo.deleteById(scheduleId);
        return new BatchResponse("Schedule removed from ", batchDB.get());
    }

    @Override
    public BatchResponse getBatch(String batchCode) throws Exception {

        Batch batchDB = batchRepo.findById(batchCode).orElseThrow(() -> new ResourceNotFoundException("Batch", "batch code", batchCode));

        return new BatchResponse("Batch data collected.", batchDB);

    }

    @Override
    public BatchResponse removeTraineeFromBatch(String email, String batchCode) throws Exception {
        return null;
    }

    public boolean scheduleOverlapChecker(Set<Schedule> schedules, Schedule schedule, String errMsg) throws Exception {
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        System.out.println(schedule);

        if (schedules.stream()
                .anyMatch(s -> !LocalTime.parse(s.getScheduleEndTime(), timeFormatter)
                        .isBefore(LocalTime.parse(schedule.getScheduleStartTime(), timeFormatter))
                        || !LocalTime.parse(s.getScheduleStartTime(), timeFormatter)
                        .isBefore(LocalTime.parse(schedule.getScheduleEndTime(), timeFormatter)))) {

            if (schedules.stream()
                    .anyMatch(s -> !LocalDate.parse(s.getEndDate(), dateFormatter)
                            .isBefore(LocalDate.parse(schedule.getStartDate(), dateFormatter))
                            || !LocalDate.parse(s.getStartDate(), dateFormatter)
                            .isBefore(LocalDate.parse(schedule.getEndDate(), dateFormatter)))) {

                throw new Exception(errMsg);
            } else {
                return true;
            }
        } else {
            return true;
        }
    }


    @Override
    public List<Batch> findBatchesByTraineeEmail(String traineeEmail) {
        return batchRepo.findByTraineesContaining(traineeEmail);
    }

    @Override
    public Notice createNotice(Notice notice) {
        return noticeRepo.save(notice);
    }

    @Override
    public void removeNoticeById(Long noticeId) {
        Notice notice = noticeRepo.findById(noticeId)
                .orElseThrow(() -> new IllegalArgumentException("Notice with ID " + noticeId + " not found"));

        noticeRepo.delete(notice);
    }

    @Override
    public List<Notice> getAllNotice() {
        return noticeRepo.findAll();
    }

    @Override
    public List<Batch> getBatchesByTrainerEmail(String trainerEmail) {
        return batchRepo.findByTrainerEmail(trainerEmail);
    }

    @Override
    public Set<Schedule> getTrainerSchedules(String trainerEmail) {

        Set<Schedule> trainerSchedules = scheduleRepo.findByTrainerEmail(trainerEmail);
        return trainerSchedules;
    }


}
