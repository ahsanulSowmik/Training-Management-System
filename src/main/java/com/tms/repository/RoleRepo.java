package com.tms.repository;

import com.tms.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepo extends JpaRepository<Role, String> {
    Role getRoleByRoleName(String roleName);

}
