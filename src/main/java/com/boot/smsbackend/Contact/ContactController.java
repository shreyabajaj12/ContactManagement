package com.boot.smsbackend.Contact;

import com.boot.smsbackend.Login.LoginRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.ILoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

@Slf4j
@RestController()
@RequestMapping("/contact")
public class ContactController {
    @Autowired
    private ContactRepository contactRepository;
    @Autowired
    private LoginRepository loginRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addContact(Authentication authentication,@RequestBody Contact contact) {
        String username = authentication.getName();
        var user=loginRepository.findByUsername(username);
        if(user==null) {
            return ResponseEntity.notFound().build();
        }
        Contact newContact=new Contact();
        newContact.setName(contact.getName());
        newContact.setEmail(contact.getEmail());
        newContact.setPhone(contact.getPhone());
        newContact.setAddress(contact.getAddress());
        newContact.setLogin(user);
        contactRepository.save(newContact);
        return ResponseEntity.ok(newContact);
    }
    @PutMapping("/put/{id}")
    public ResponseEntity<?> updateContact(Authentication authentication,@RequestBody Contact contact, @PathVariable String id) {
        String username = authentication.getName();
        var user=loginRepository.findByUsername(username);
        if(user==null) {
            return ResponseEntity.status(404).body("Contact not found");
        }
        Contact cont=contactRepository.findByLogin_UsernameAndId(username,id);
        if(cont==null)return ResponseEntity.status(404).body("Contact not found");
        cont.setName(contact.getName());
        cont.setEmail(contact.getEmail());
        cont.setPhone(contact.getPhone());
        cont.setAddress(contact.getAddress());
        contactRepository.save(cont);
        return ResponseEntity.ok(cont);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteContact(Authentication authentication,@PathVariable String id ) {
        String username = authentication.getName();
        var user=loginRepository.findByUsername(username);
        if(user==null) {
            return ResponseEntity.status(404).body("Contact not found");
        }
        Contact cont=contactRepository.findByLogin_UsernameAndId(username,id);
        if(cont==null)return ResponseEntity.status(404).body("Contact not found");
        contactRepository.delete(cont);
        return ResponseEntity.ok().body("Contact deleted successfully");
    }
    @GetMapping()
    public ResponseEntity<?> getAllContacts(Authentication authentication, @RequestParam(value = "page",defaultValue = "0")int page, @RequestParam(value="size",defaultValue = "5") int size, @RequestParam(value="sortBy",defaultValue = "name") String sortBy, @RequestParam(value = "direction",defaultValue = "asc") String direction) {
        String username = authentication.getName();
        if(loginRepository.findByUsername(username)!=null) {
            Sort sort=direction.equals("desc")?Sort.by(sortBy).descending():Sort.by(sortBy).ascending();
            var pageable= PageRequest.of(page,size,sort);
            Page<Contact> temp=contactRepository.findByLogin_Username(username,pageable);
            System.out.println(temp.getTotalPages());
            log.info("Fetching contacts for username = {}", username);
            return ResponseEntity.ok().body(contactRepository.findByLogin_Username(username,pageable));
        }
        else return ResponseEntity.status(404).body("Contact not found");

    }
//    search handler
    @GetMapping("/search")
    public ResponseEntity<?>getContactSearch(Authentication authentication,
                                             @RequestParam(value="field",defaultValue = "name")String field,
                                             @RequestParam(value="keyword",defaultValue = "")String keyword,
                                             @RequestParam(value = "page",defaultValue = "0")int page,
                                             @RequestParam(value="size",defaultValue = "5") int size,
                                             @RequestParam(value="sortBy",defaultValue = "name") String sortBy,
                                             @RequestParam(value = "direction",defaultValue = "asc") String direction) {
        String username = authentication.getName();
        if(loginRepository.findByUsername(username)!=null){
            Sort sort=direction.equals("desc")?Sort.by(sortBy).descending():Sort.by(sortBy).ascending();
            var pageable= PageRequest.of(page,size,sort);
            if(field==null ||field.equals("name")) {
                return ResponseEntity.ok().body(contactRepository.findByLogin_UsernameAndNameContaining(username,keyword,pageable));
            }
            else if(field.equals("email")) {
                return ResponseEntity.ok().body(contactRepository.findByLogin_UsernameAndEmailContaining(username,keyword,pageable));
            }
            else if(field.equals("phone")) {
                return ResponseEntity.ok().body(contactRepository.findByLogin_UsernameAndPhoneContaining(username,keyword,pageable));

            }
        }
        return ResponseEntity.status(404).body("Contact not found");
    }
}
