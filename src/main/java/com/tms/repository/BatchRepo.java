package com.tms.repository;


import com.tms.entity.Batch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BatchRepo extends JpaRepository<Batch, String> {

    List<Batch> findByTraineesContaining(String traineeEmail);
//    List<Batch> findByStatus(String status);
}
