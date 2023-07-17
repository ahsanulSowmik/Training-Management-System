package com.tms.service.implementation;

import com.tms.entity.Course;
import com.tms.entity.User;
import com.tms.functional.UserDetails;
import com.tms.repository.*;
import com.tms.response.CourseResponse;
import com.tms.response.CoursesResponse;
import com.tms.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class CourseServiceImple implements CourseService {

    @Autowired
    RoleRepo roleRepo;
    @Autowired
    private AdminRepo adminRepos;
    @Autowired
    private TrainerRepo trainerRepos;

    @Autowired
    private ScheduleRepo scheduleRepo;

    @Autowired
    private CourseRepo courseRepo;
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BatchRepo batchRepo;

    private final UserDetails userData = (email) -> {
        Optional<User> user = userRepo.findById(email);
        if(user.isPresent()) return user.get();
        return null;
    };
    @Override
    public CoursesResponse getCourseData() throws Exception {

            return new CoursesResponse("Courses collected", courseRepo.findByStatus("previous"), courseRepo.findByStatus("running"), courseRepo.findByStatus("upcoming"));

    }

    @Override
    public CourseResponse createCourse(Course course) throws Exception {
        Optional<Course> courseDB = courseRepo.findById(course.getCourseCode());
        if(courseDB.isPresent()) throw new Exception("Course already exist: " + course.getCourseCode());
        courseRepo.save(course);
        return new CourseResponse("Course added.", course);
    }

    @Override
    public CourseResponse updateCourseData(Course course) throws Exception {
        Optional<Course> courseDB = courseRepo.findById(course.getCourseCode());
        if(courseDB.isEmpty()) throw new Exception("Course not found: " + course.getCourseCode());
        courseRepo.save(course);
        return new CourseResponse("Course updated.", course);
    }
}
