package com.tms.request;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class AssignRoleRequest {
    private String email;
    private String roleName;
}
