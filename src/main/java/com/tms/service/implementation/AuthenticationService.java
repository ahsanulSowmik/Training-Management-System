package com.tms.service.implementation;

import com.tms.exceptions.InvalidUserException;
import com.tms.repository.UserRepo;
import com.tms.request.AuthenticationRequest;
import com.tms.request.AuthenticationResponse;
import com.tms.response.AuthResponse;
import com.tms.units.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepo userRepo;

    public AuthResponse login(AuthenticationRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getEmail(),
                            authenticationRequest.getPassword()
                    )
            );

            var user = userRepo.findByEmail(authenticationRequest.getEmail());
            var jwtToken = jwtService.generateToken((UserDetails) user);
            AuthenticationResponse authRes = AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();

            return new AuthResponse("User login successful", user, jwtToken);

        } catch (BadCredentialsException ex) {
            throw new InvalidUserException("Invalid email or password");


        }
    }
}
