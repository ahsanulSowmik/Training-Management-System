package com.tms.service;

import com.tms.entity.User;
import com.tms.model.UserDto;
import com.tms.response.AllUserResponse;
import com.tms.response.RoleResponse;
import com.tms.response.UserResponse;

public interface UserService {

    public UserResponse createUser(UserDto userDto);
    public RoleResponse assignUserRole(String email, String roleName) throws Exception;

    public AllUserResponse getAllUser();

    public UserResponse getUserByEmail( String email);

    public UserResponse editUserProfile(UserDto userDto);
}
