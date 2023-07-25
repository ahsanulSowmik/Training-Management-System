package com.tms.repository;


import com.tms.entity.Assignment;
import com.tms.entity.AssignmentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AssignmentAnswerRepo extends JpaRepository<AssignmentAnswer, Long> {

//    @Query("SELECT a FROM Assignment a JOIN a.answers ans WHERE ans.traineeEmail = :traineeEmail")
//    List<Assignment> findAssignmentsByTraineeEmail(@Param("traineeEmail") String traineeEmail);
List<AssignmentAnswer> findByTraineeEmail(String traineeEmail);
}
