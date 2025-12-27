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
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
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
        String token = null;
        if(request.getCookies()!=null){
            for(var cookie : request.getCookies()){
                if("token".equals(cookie.getName())){
                    token = cookie.getValue();
                    break;
                }
            }
        }
    if(token == null) {
        String requestTokenHeader=request.getHeader("Authorization");
        if(requestTokenHeader==null || !requestTokenHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        token=requestTokenHeader.split("Bearer ")[1];
    }
        String username=null;
    try{
        username=authUtil.getUsernameFromToken(token);
    }
    catch (Exception e){
        filterChain.doFilter(request, response);
        return;
    }


        if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
            Login login=loginRepository.findByUsername(username);
            if (login == null) {
                filterChain.doFilter(request, response);
                return;
            }
            UsernamePasswordAuthenticationToken authentication=new UsernamePasswordAuthenticationToken(login,null,login.getAuthorities());
            authentication.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return path.startsWith("/auth/login")
                || path.startsWith("/auth/signup")
                || path.startsWith("/oauth2/")
                || path.equals("/login");
    }

}
