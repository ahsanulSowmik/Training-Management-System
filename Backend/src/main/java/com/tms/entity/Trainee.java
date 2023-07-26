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
@Table(name = Trainee.TABLE_NAME)
public class Trainee {
    public static final String TABLE_NAME= "TRAINEE";

    @Id
    private String traineeEmail;
    private String experience;
    private String bloodGroup;
    private String resume;
    private String institute;
    private String cgpa;

    public Trainee(String traineeEmail) {
        this.traineeEmail = traineeEmail;
    }

}
