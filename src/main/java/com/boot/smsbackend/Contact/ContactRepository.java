package com.boot.smsbackend.Contact;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface ContactRepository extends JpaRepository<Contact, String> {

    Contact findByLogin_UsernameAndId(String username, String id) ;

    Page<Contact> findByLogin_Username(String username, Pageable pageable);
}
