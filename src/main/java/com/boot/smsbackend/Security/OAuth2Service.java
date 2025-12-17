package com.boot.smsbackend.Security;

import com.boot.smsbackend.AuthProviderType;
import com.boot.smsbackend.Login.Login;
import com.boot.smsbackend.Login.LoginRepository;
import com.boot.smsbackend.dto.LoginResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuth2Service {
    private final AuthUtil authUtil;
    private final LoginRepository loginRepository;
    public ResponseEntity<LoginResponseDto> handleOAuth2LoginRequest(OAuth2User oAuth2User, String registrationId) {
        AuthProviderType providerType=authUtil.getAuthProviderTypeFromRegistrationId(registrationId);
        String providerUsername=oAuth2User.getAttribute("email");
        if(providerUsername==null){
            providerUsername=oAuth2User.getAttribute("login");
        }
        System.out.println(providerUsername);
        Login login=loginRepository.findByUsernameAndProviderType(providerUsername,providerType);
        Login tempLogin=loginRepository.findByUsername(providerUsername);
        if(login==null) {
            String username = providerUsername;
            String name = oAuth2User.getAttribute("name");
            System.out.println(name);
            String profile = oAuth2User.getAttribute("profile");
            Login newLogin = new Login();
            newLogin.setUsername(username);
            newLogin.setName(name);
            newLogin.setProfile(profile);
            newLogin.setProviderType(providerType);
            loginRepository.save(newLogin);
        }
        else if(tempLogin==null && login!=null){
            throw new BadCredentialsException("this email already exists with provider type "+providerType);
        }
        Login login1=loginRepository.findByUsername(providerUsername);
        LoginResponseDto loginResponseDto=new LoginResponseDto(authUtil.generateAccessToken(login1),login1.getUsername(),login1.getName());
        return ResponseEntity.ok(loginResponseDto);
    }
}
