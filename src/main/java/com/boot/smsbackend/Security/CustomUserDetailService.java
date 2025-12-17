package com.boot.smsbackend.Security;

import com.boot.smsbackend.Contact.ContactRepository;
import com.boot.smsbackend.Login.Login;
import com.boot.smsbackend.Login.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final LoginRepository loginRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Login user=loginRepository.findByUsername(username);
        if(user==null){
            throw new UsernameNotFoundException(username);
        }
        return user;
    }
}
