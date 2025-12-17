package com.boot.smsbackend.Login;

import com.boot.smsbackend.AuthProviderType;
import com.boot.smsbackend.Contact.Contact;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Login implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;
    @JoinColumn(unique = true)
    private String username;
    private String name;
    private String password;
    @OneToMany(mappedBy="login",cascade = CascadeType.ALL,fetch= FetchType.LAZY,orphanRemoval = true)
    private List<Contact> contact=new ArrayList<Contact>();
    @Enumerated(EnumType.STRING)
    private AuthProviderType providerType;
    private String providerId;
    private String profile;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }


}
