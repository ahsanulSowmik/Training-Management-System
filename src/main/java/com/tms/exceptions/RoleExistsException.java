package com.tms.exceptions;

public class RoleExistsException extends RuntimeException {
    public RoleExistsException(String message) {
        super(message);
    }
}
