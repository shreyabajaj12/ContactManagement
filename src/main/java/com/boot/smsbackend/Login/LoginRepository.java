package com.boot.smsbackend.Login;

import com.boot.smsbackend.AuthProviderType;
import com.boot.smsbackend.Contact.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LoginRepository extends JpaRepository<Login, String> {
    Login findByUsername(String username);

    Login findByUsernameAndProviderType(String providerUsername, AuthProviderType providerType);
}
