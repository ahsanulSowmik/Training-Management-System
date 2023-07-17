package com.tms.repository;


import com.tms.entity.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TrainerRepo extends JpaRepository<Trainer, String> {

}
