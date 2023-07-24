package com.tms.config;

import com.tms.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final UserRepo userRepo;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers("/api/downloadFile/{fileCode}")
                .permitAll()
                .requestMatchers("/auth/login")
                .permitAll()
                .requestMatchers("/api/user/create-user").hasAuthority("ADMIN")
                .requestMatchers("/api/batch/create","/api/batch/add-schedule","/api/batch/remove-schedule","/api/batch/add-trainee","api/batch/create-notice","/api/course/Create","/api/course/update","/api/user/create-user","/api/user/assign-role","/api/user/delete/{email}","api/batch/remove-notice/*").hasAuthority("ADMIN")
                .requestMatchers("/api/user/get-all-user").hasAnyAuthority("TRAINEE","ADMIN","TRAINER")
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        ;
        return http.build();
    }
}
