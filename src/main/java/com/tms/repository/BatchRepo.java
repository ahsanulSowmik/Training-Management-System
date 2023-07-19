package com.tms.repository;


import com.tms.entity.Batch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BatchRepo extends JpaRepository<Batch, String> {

    List<Batch> findByTraineesContaining(String traineeEmail);

    @Query("SELECT DISTINCT b FROM Batch b JOIN b.schedules s WHERE s.trainerEmail = :trainerEmail")
    List<Batch> findByTrainerEmail(@Param("trainerEmail") String trainerEmail);
//    List<Batch> findByStatus(String status);
}
