package com.boot.smsbackend.error;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public class ApiError {
    private LocalDateTime timeStamp = LocalDateTime.now();
    private String error;
    private HttpStatus status;
    public ApiError(){
        this.timeStamp= LocalDateTime.now();
    }
    public ApiError(String error, HttpStatus status){
        this.error = error;
        this.status = status;
    }
}
