package com.boot.smsbackend;

import com.boot.smsbackend.email.EmailService;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.io.UnsupportedEncodingException;

@SpringBootTest
public class EmailSenderTest {
    @Autowired
    private EmailService emailService;
    @Test
    void emailSendTest() throws MessagingException, UnsupportedEncodingException {
//        emailService.sendEmail("shreyabajaj112@gmail.com","hiii bro","how's your day ");
        emailService.sendEmail("shreyabajaj112@gmail.com","<h1>Bro are you okeyyyy!!!<h1>","Rakshit Bajaj","shreyabajaj589@gmail.com");
    }
    @Test
    void sendEmailWithFile() throws MessagingException, UnsupportedEncodingException {
        emailService.sendEmailWithFile(
                "shreyabajaj112@gmail.com",
                "i am sending you parcel",
                new File("SMS-frontend/src/assets/account.png"),
                "rakshit bajaj",
                "shreyabajaj589@gmail.com"
        );
    }

}
