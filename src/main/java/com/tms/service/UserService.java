package com.tms.service;

import com.tms.entity.User;
import com.tms.model.UserDto;
import com.tms.response.AllUserResponse;
import com.tms.response.RoleResponse;
import com.tms.response.UserResponse;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService {

    public UserResponse createUser(UserDto userDto);
    public RoleResponse assignUserRole(String email, String roleName) throws Exception;

    public AllUserResponse getAllUser();

    public UserResponse getUserByEmail( String email);

    public UserResponse editUserProfile(UserDto userDto);

    public UserResponse deleteUserData(String email)  throws UsernameNotFoundException;
}
