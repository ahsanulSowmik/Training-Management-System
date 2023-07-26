package com.tms.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = User.TABLE_NAME)
@Builder
public class User implements UserDetails {

//implements UserDetails
    public static final String TABLE_NAME= "USER";

	@Id
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String address;
    private String dateOfBirth;
    private String gender;
    private String profilePicture;
    private String phone;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinTable(name = "USER_ROLE",
            joinColumns = {
                    @JoinColumn(name = "email")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "role_name")
            }
    )
    private Set<Role> role = new HashSet<>();
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "USER_TRAINEE",
            joinColumns = {
                    @JoinColumn(name = "email")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "trainee_email")
            }
    )
    private Trainee trainee;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "USER_TRAINER",
            joinColumns = {
                    @JoinColumn(name = "email")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "trainer_email")
            }
    )
    private Trainer trainer;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "USER_ADMIN",
            joinColumns = {
                    @JoinColumn(name = "email")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "admin_email")
            }
    )
    private Admin admin;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.stream()
                .map(role -> new SimpleGrantedAuthority(role.getRoleName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
