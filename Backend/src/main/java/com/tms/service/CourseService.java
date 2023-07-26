package com.tms.service;

import com.tms.entity.Course;
import com.tms.response.CourseResponse;
import com.tms.response.CoursesResponse;


public interface CourseService {

    public CoursesResponse getCourseData() throws Exception;

    public CourseResponse createCourse(Course course)  throws Exception;

    public CourseResponse updateCourseData(Course course)  throws Exception;


}
