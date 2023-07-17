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
@Table(name = Admin.TABLE_NAME)
public class Admin {
    public static final String TABLE_NAME= "ADMIN";

    @Id
    private String adminEmail;
    private String designation;

    public Admin(String email){
        super();
        this.adminEmail = email;
    }

}