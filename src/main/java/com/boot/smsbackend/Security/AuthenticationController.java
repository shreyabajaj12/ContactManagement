package com.boot.smsbackend.Security;

import com.boot.smsbackend.Login.Login;
import com.boot.smsbackend.Login.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping()
public class AuthenticationController {
    @Autowired
    LoginRepository loginRepository;
    @GetMapping("/auth/me")
    public ResponseEntity<?> me(Authentication authentication) {
        String username = authentication.getName();

        Login user = loginRepository.findByUsername(username);
        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(
                Map.of(
                        "username", user.getUsername(),
                        "name", user.getName()
                )
        );
    }
}
