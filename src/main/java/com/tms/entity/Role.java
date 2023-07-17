package com.tms.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = Role.TABLE_NAME)
public class Role {
    public static final String TABLE_NAME= "ROLE";
	@Id
    private String roleName;
    private String roleDescription;
}
