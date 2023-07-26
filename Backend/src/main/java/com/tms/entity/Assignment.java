package com.tms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = Assignment.TABLE_NAME)
public class Assignment {
    public static final String TABLE_NAME= "ASSIGNMENT";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assignmentId;
    private String question;
    private String assignmentFile;
    private String endTime;
    @OneToMany( fetch = FetchType.EAGER)
    private Set<AssignmentAnswer> answers = new HashSet<>();
}
