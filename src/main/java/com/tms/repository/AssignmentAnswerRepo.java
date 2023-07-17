package com.tms.repository;


import com.tms.entity.AssignmentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AssignmentAnswerRepo extends JpaRepository<AssignmentAnswer, Long> {
}
