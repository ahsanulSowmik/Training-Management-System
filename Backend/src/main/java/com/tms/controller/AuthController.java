package com.tms.controller;


import com.tms.request.AuthenticationRequest;
import com.tms.service.implementation.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/login")
@CrossOrigin
public class AuthController {

    private final AuthenticationService authenticationService;
    @PostMapping
    public ResponseEntity<Object> login(@RequestBody AuthenticationRequest authenticationRequest){

        return new ResponseEntity<>(authenticationService.login(authenticationRequest), HttpStatus.OK);
    }
}
