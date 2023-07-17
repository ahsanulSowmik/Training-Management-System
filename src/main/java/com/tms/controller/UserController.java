package com.tms.controller;

import com.tms.entity.User;
import com.tms.model.UserDto;
import com.tms.request.AssignRoleRequest;
import com.tms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping({"/api/user/create-user"})
    public ResponseEntity<?> createAccount( @RequestBody UserDto userDto) throws Exception {
        return new ResponseEntity<>(userService.createUser(userDto), HttpStatus.OK);
    }

    @GetMapping("/api/user/get/{email}")
    public ResponseEntity<?> getUser( @PathVariable String email) {
        return new ResponseEntity<>(userService.getUserByEmail( email), HttpStatus.OK);
    }

    @GetMapping ("/api/user/get-all-user")
    public ResponseEntity<?> getAllUser() {
        return new ResponseEntity<>(userService.getAllUser(), HttpStatus.OK);
    }

    @PostMapping ("/api/user/edit")
    public ResponseEntity<?> editUser(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.editUserProfile( userDto), HttpStatus.OK);
    }

    @PostMapping ("/api/user/assign-role")
    public ResponseEntity<?> assignUserRole(@RequestBody AssignRoleRequest assignRoleRequest) throws Exception {
        return new ResponseEntity<>(userService.assignUserRole(assignRoleRequest.getEmail(), assignRoleRequest.getRoleName()), HttpStatus.OK);
    }

}
