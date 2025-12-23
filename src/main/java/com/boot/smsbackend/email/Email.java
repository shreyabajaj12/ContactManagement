package com.boot.smsbackend.email;

import lombok.Getter;
import lombok.Setter;

import java.io.File;

@Getter
@Setter
public class Email {
    public String from;
    public String to;
    public String message;
    public String sendername;
    public File file;

}
