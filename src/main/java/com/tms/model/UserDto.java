package com.tms.model;

import com.tms.entity.Role;
import com.tms.entity.Trainer;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    @Email(message = "Email address is not valid !!")
    @NotEmpty(message = "Email is required !!")
    private String email;
    private String password;

    @NotEmpty
    @Size(min = 4, message = "Username must be min of 4 characters !!")
    private String firstName;
    private String lastName;
    private String address;
    private String dateOfBirth;
    private String gender;
    private String profilePicture;
    private String phone;
    private Set<Role> role = new HashSet<>();
    private TraineeDto trainee;
    private Trainer trainer;
    private AdminDto admin;
}
