package com.tms.controller;


import com.tms.entity.Course;
import com.tms.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class CourseController {

    @Autowired
    CourseService courseService;

    @GetMapping ("/api/course/get/all")
    public ResponseEntity<?> getCourse() throws Exception {
        return new ResponseEntity<>(courseService.getCourseData(), HttpStatus.OK);
    }
    @PostMapping ("/api/course/Create")
    public ResponseEntity<?> createCourse(@RequestBody Course course) throws Exception {
        return new ResponseEntity<>(courseService.createCourse(course), HttpStatus.OK);
    }
    @PostMapping ("/api/course/update")
    public ResponseEntity<?> updateCourse(@RequestBody Course course) throws Exception {
        return new ResponseEntity<>(courseService.updateCourseData(course), HttpStatus.OK);
    }

}
