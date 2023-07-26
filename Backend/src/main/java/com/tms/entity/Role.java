package com.tms.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = Role.TABLE_NAME)
public class Role {
    public static final String TABLE_NAME= "ROLE";
	@Id
    private String roleName;
    private String roleDescription;
}
