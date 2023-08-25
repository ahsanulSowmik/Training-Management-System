package com.tms.service;

import com.tms.entity.Attendance;

import java.util.List;

public interface AttendanceService {

    Attendance addAttendance(Attendance attendance);

    List<Attendance> getAllAttendance();
    List<Attendance> getAttendanceByBatchCode(String batchCode);
}
