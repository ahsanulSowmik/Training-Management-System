package com.tms.repository;


import com.tms.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;


@Repository
public interface ScheduleRepo extends JpaRepository<Schedule, Long> {
    Set<Schedule> findByTrainerEmail(String email);
}
