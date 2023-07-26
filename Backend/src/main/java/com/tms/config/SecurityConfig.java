package com.tms.config;

import com.tms.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
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
                .requestMatchers("/ws/**")
                .permitAll()
                .requestMatchers("/api/course/get/all","/api/user/get-all-user","/api/user/get-all-user","/api/user/get-all-trainer","/api/user/get-all-trainee","/classrooms/{classroomId}/posts","/{classroomId}/post/{postId}/comments","/{classroomId}/post/{postId}","/api/batch/get/all","api/batch/get-all-notice").hasAnyAuthority("ADMIN","TRAINER","TRAINEE")
                .requestMatchers("/api/user/create-user").hasAuthority("ADMIN")
                .requestMatchers("/api/batch/create","/api/batch/add-schedule","/api/batch/remove-schedule","/api/batch/add-trainee","api/batch/create-notice","/api/course/Create","/api/course/update","/api/user/create-user","/api/user/assign-role","/api/user/delete/{email}","api/batch/remove-notice/{noticeId}").hasAuthority("ADMIN")
                .requestMatchers("/api/schedule/add-assignment","/api/schedule/assignment/{assignmentId}/all-answer","/api/schedule/add-assignment-answer-evaluate","/api/schedule/remove-assignment","/classrooms/{postId}","api/batch/get-by-trainer-mail/{trainerEmail}","api/batch/get-trainer's-schedules/{trainerEmail}").hasAnyAuthority("TRAINER")
                .requestMatchers("api/batch/get-by-mail/{traineeEmail}").hasAnyAuthority("TRAINEE")
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
