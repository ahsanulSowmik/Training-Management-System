package com.tms.controller;

import com.tms.entity.User;
import com.tms.model.UserDto;
import com.tms.request.AssignRoleRequest;
import com.tms.request.BatchScheduleRequest;
import com.tms.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping({"/api/user/create-user"})
    public ResponseEntity<?> createAccount(@Valid @RequestBody UserDto userDto) throws Exception {
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

    @GetMapping ("/api/user/get-all-trainer")
    public ResponseEntity<?> getAllTrainer() {
        return new ResponseEntity<>(userService.getUserEmailsAssignedAsTrainers(), HttpStatus.OK);
    }

    @GetMapping ("/api/user/get-all-trainee")
    public ResponseEntity<?> getAllTrainee() {
        return new ResponseEntity<>(userService.getUserEmailsAssignedAsTrainees(), HttpStatus.OK);
    }

    @PostMapping ("/api/user/edit")
    public ResponseEntity<?> editUser(@Valid @RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.editUserProfile( userDto), HttpStatus.OK);
    }

    @PostMapping ("/api/user/assign-role")
    public ResponseEntity<?> assignUserRole(@RequestBody AssignRoleRequest assignRoleRequest) throws Exception {
        return new ResponseEntity<>(userService.assignUserRole(assignRoleRequest.getEmail(), assignRoleRequest.getRoleName()), HttpStatus.OK);
    }

    @DeleteMapping ("/api/user/delete/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable String email) {
        return new ResponseEntity<>(userService.deleteUserData(email), HttpStatus.OK);
    }

    @GetMapping ("/api/user/submission/{email}")
    public ResponseEntity<?> getAllAnswerByTraineeEmail(@PathVariable String email) {
        return new ResponseEntity<>(userService.getAllAnswerByTraineeEmail(email), HttpStatus.OK);
    }



}
