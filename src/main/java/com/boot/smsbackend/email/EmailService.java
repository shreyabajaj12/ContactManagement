package com.boot.smsbackend.email;

import jakarta.mail.MessagingException;

import java.io.File;
import java.io.UnsupportedEncodingException;

public interface EmailService {
    void sendEmail(String to,String message,String senderName,String senderEmail) throws MessagingException, UnsupportedEncodingException;
    void sendEmailWithFile(String to, String message, File file, String senderName,String senderEmail) throws MessagingException, UnsupportedEncodingException;
}
