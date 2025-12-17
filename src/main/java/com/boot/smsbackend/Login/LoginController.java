package com.boot.smsbackend.Login;

import com.boot.smsbackend.Security.AuthService;
import com.boot.smsbackend.dto.LoginRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class LoginController {
    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;
    private final LoginRepository repo;
    @PostMapping("/signup")
    private ResponseEntity<?> addUser(@RequestBody Login login){
        Login log =repo.findByUsername(login.getUsername());
        if(log!=null)return ResponseEntity.status(400).body("user already exist");
        Login newLogin =new Login();
        newLogin.setUsername(login.getUsername());
        newLogin.setPassword(passwordEncoder.encode(login.getPassword()));
        newLogin.setName(login.getName());
        repo.save(newLogin);
        return ResponseEntity.ok().body(newLogin);
    }

    @PostMapping("/login")
    private ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto){
        return ResponseEntity.ok(authService.login(loginRequestDto));
    }
}
