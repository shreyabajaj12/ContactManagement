package com.boot.smsbackend.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.UnsupportedEncodingException;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService{
    @Autowired
    private JavaMailSender mailSender;
    @Override
    public void sendEmail(String to, String message,String senderName,String senderEmail) throws MessagingException, UnsupportedEncodingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        helper.setTo(to);
        helper.setText(message, true);
        helper.setFrom(
                senderEmail,
                "Contact Management - "+senderName
        );
        helper.setReplyTo(senderEmail);
        mailSender.send(mimeMessage);
        log.info("Email sent successfully");

    }


    @Override
    public void sendEmailWithFile(String to, String message, File file, String senderName, String senderEmail) throws MessagingException, UnsupportedEncodingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,true);
        helper.setTo(to);
        helper.setText(message, true);
        helper.setFrom(
                senderEmail,
                "Contact Management - "+senderName
        );
        FileSystemResource fileSystemResource = new FileSystemResource(file);
        helper.addAttachment(fileSystemResource.getFilename(),file);
        helper.setReplyTo(senderEmail);
        mailSender.send(mimeMessage);
        log.info("Email sent successfully with file things attach");
    }
}
