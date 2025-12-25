package com.boot.smsbackend.email;

import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/email")
public class EmailController {
    @Autowired
    EmailServiceImpl emailService;
    @PostMapping("/item")
    public ResponseEntity<?> sendEmail(Authentication authentication, @RequestBody Email email) throws MessagingException, UnsupportedEncodingException {
        try{
            if(email.getFile()==null){
                emailService.sendEmail(email.getTo(), email.getMessage(), authentication.getName(), email.getFrom());
            }
            else{
                emailService.sendEmailWithFile(email.getTo(), email.getMessage(),email.getFile(),authentication.getName(), email.getFrom());
            }

        }
        catch(Exception e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
        return ResponseEntity.ok().build();
    }

}
