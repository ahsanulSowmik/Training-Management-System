package com.tms.model;

import com.tms.entity.Role;
import com.tms.entity.Trainer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


@NoArgsConstructor
@Setter
@Getter
public class UserDto {
    private String email;
    private String password;
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
