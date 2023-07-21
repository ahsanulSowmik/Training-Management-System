package com.tms.repository;


import com.tms.entity.Assignment;
import com.tms.entity.AssignmentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;


@Repository
public interface AssignmentRepo extends JpaRepository<Assignment, Long> {
    Assignment findByAnswersIn(Set<AssignmentAnswer> answers);
}
