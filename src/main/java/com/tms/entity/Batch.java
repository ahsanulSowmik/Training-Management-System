package com.tms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = Batch.TABLE_NAME)
public class Batch {
    public static final String TABLE_NAME= "BATCH";

	@Id
    private String batchCode;
    private String name;

    @Column(name="description")
    private String description;
    private String startDate;
    private String endDate;
    @ElementCollection
    private Set<String> trainees;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Schedule> schedules;

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private Classroom classroom;




}
