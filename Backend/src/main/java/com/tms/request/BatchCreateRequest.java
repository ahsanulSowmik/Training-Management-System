package com.tms.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class BatchCreateRequest {

    @NotBlank(message = "Batch code cannot be blank")
    private String batchCode;

    @NotBlank(message = "Name cannot be blank")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;

    @Size(max = 255, message = "Description cannot exceed 255 characters")
    private String description;

    @NotBlank(message = "Start date cannot be blank")
    private String startDate;

    @NotBlank(message = "End date cannot be blank")
    private String endDate;

    private Set<String> trainees;

    // Getters and setters
}
