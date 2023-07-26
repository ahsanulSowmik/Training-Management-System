package com.tms.model;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class TraineeDto {
    private String traineeEmail;
    private String experience;
    private String bloodGroup;
    private String resume;
    private String institute;
    private String cgpa;

        public TraineeDto(String traineeEmail) {
        this.traineeEmail = traineeEmail;
    }
}
