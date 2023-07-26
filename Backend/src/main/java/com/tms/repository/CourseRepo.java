package com.tms.repository;

import com.tms.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepo extends JpaRepository<Course, String> {
    List<Course> findByStatus(String status);
}
