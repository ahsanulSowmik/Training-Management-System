package com.tms.repository;

import com.tms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, String> {

    public User findByEmail(String email);

    @Query("SELECT u.email FROM User u WHERE u.trainer IS NOT NULL")
    List<String> findUserEmailsAssignedAsTrainers();

    @Query("SELECT u.email FROM User u WHERE u.trainee IS NOT NULL")
    List<String> findUserEmailsAssignedAsTrainees();

}
