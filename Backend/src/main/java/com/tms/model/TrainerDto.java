package com.tms.model;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class TrainerDto {


    private String trainerEmail;
    private String experience;
    private String bloodGroup;
    private String expertise;

    public TrainerDto(String email){
        super();
        this.trainerEmail = email;
    }
}
