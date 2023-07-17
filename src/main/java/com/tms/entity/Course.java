package com.tms.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = Course.TABLE_NAME)
public class Course {
    public static final String TABLE_NAME= "COURSE";

	@Id
    private String courseCode;
    private String name;
    private String description;
    private String status;
}
