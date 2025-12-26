package com.boot.smsbackend.Contact;

import com.boot.smsbackend.Login.Login;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String Id;
    private String name;
    private String phone;
    private String email;
    private String address;
    private String linkedin;
    private String github;
    private String website;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="login_id")
    private Login login;
}
