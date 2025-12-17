package com.boot.smsbackend.Security;

import com.boot.smsbackend.AuthProviderType;
import com.boot.smsbackend.Login.Login;
import com.boot.smsbackend.Login.LoginRepository;
import com.boot.smsbackend.dto.LoginRequestDto;
import com.boot.smsbackend.dto.LoginResponseDto;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthUtil authUtil;
    private final AuthenticationManager authenticationManager;
    private final LoginRepository loginRepository;

    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDto.getUsername(), loginRequestDto.getPassword())
        );
        Login login= (Login) authentication.getPrincipal();

        String token=authUtil.generateAccessToken(login);
        return new LoginResponseDto(token,login.getUsername(),login.getName());
    }
//    @Transactional

}
