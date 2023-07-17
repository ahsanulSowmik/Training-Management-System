package com.tms.repository;


import com.tms.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AssignmentRepo extends JpaRepository<Assignment, Long> {
}
