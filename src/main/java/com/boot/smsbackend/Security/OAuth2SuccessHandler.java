package com.boot.smsbackend.Security;

import com.boot.smsbackend.dto.LoginResponseDto;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final OAuth2Service oAuth2Service;
    private final ObjectMapper objectMapper;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        System.out.println(oAuth2User);
        String registrationId = token.getAuthorizedClientRegistrationId();

        oAuth2Service.handleOAuth2LoginRequest(
                oAuth2User,
                registrationId,
                response
        );

//        ResponseEntity<LoginResponseDto> loginResponse=oAuth2Service.handleOAuth2LoginRequest(oAuth2User,registrationId);
//        response.setStatus(loginResponse.getStatusCode().value());
//        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//        response.getWriter().write(objectMapper.writeValueAsString(loginResponse.getBody()));
//        LoginResponseDto body = loginResponse.getBody();
//
//        Cookie jwtCookie =new Cookie("token",body.getToken());
//        jwtCookie.setHttpOnly(true);
//        jwtCookie.setSecure(false);
//        jwtCookie.setPath("/");
//        jwtCookie.setMaxAge(7*24*60*60);
        String redirectUrl="http://localhost:5173/oauth2/callback";
//        response.addCookie(jwtCookie);
        response.sendRedirect(redirectUrl);

    }
}
