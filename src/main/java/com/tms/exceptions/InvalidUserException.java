package com.tms.exceptions;

public class InvalidUserException extends RuntimeException{


    public InvalidUserException(String message){
        super(message);
    }

}