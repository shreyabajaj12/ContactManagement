package com.boot.smsbackend.Security;

import com.boot.smsbackend.Login.Login;
import com.boot.smsbackend.Login.LoginRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final LoginRepository loginRepository;
    private final AuthUtil authUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        log.info("incoming request :{}", request.getRequestURI());

        String requestTokenHeader=request.getHeader("Authorization");
        if(requestTokenHeader==null || !requestTokenHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        String token=requestTokenHeader.split("Bearer ")[1];
        String username=authUtil.getUsernameFromToken(token);

        if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
            Login login=loginRepository.findByUsername(username);
            UsernamePasswordAuthenticationToken authentication=new UsernamePasswordAuthenticationToken(login,null,login.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return path.startsWith("/auth/")
                || path.startsWith("/oauth2/")
                || path.equals("/login");
    }

}
