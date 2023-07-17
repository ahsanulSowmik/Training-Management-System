package com.tms.repository;

import com.tms.entity.Trainee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TraineeRepo extends JpaRepository<Trainee, String> {

}

