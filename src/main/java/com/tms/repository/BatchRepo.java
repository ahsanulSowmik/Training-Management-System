package com.tms.repository;


import com.tms.entity.Batch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BatchRepo extends JpaRepository<Batch, String> {
//    List<Batch> findByStatus(String status);
}
