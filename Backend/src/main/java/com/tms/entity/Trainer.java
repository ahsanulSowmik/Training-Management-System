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
@Table(name = Trainer.TABLE_NAME)
public class Trainer {
    public static final String TABLE_NAME= "TRAINER";

    @Id
    private String trainerEmail;
    private String experience;
    private String bloodGroup;
    private String expertise;

    public Trainer(String email){
        super();
        this.trainerEmail = email;
    }
}
