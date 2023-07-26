package com.tms.service;

import com.tms.entity.Assignment;
import com.tms.entity.AssignmentAnswer;
import com.tms.exceptions.UserAlreadyExistException;
import com.tms.model.UserDto;
import com.tms.response.AllUserResponse;
import com.tms.response.RoleResponse;
import com.tms.response.UserResponse;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

public interface UserService {

    public UserResponse createUser(UserDto userDto) throws UserAlreadyExistException;
    public RoleResponse assignUserRole(String email, String roleName) throws Exception;

    public AllUserResponse getAllUser();

    public UserResponse getUserByEmail( String email);

    public UserResponse editUserProfile(UserDto userDto);

    public UserResponse deleteUserData(String email)  throws UsernameNotFoundException;

    public List<String> getUserEmailsAssignedAsTrainers();
    public List<String> getUserEmailsAssignedAsTrainees();

    public List<AssignmentAnswer> getAllAnswerByTraineeEmail (String email);


}
