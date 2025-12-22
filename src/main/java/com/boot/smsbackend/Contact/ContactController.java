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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

@Slf4j
@RestController()
@RequestMapping("/contact/{username}")
public class ContactController {
    @Autowired
    private ContactRepository contactRepository;
    @Autowired
    private LoginRepository loginRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addContact(@RequestBody Contact contact, @PathVariable String username) {
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
    public ResponseEntity<?> updateContact(@RequestBody Contact contact, @PathVariable String username, @PathVariable String id) {
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
    public ResponseEntity<?> deleteContact(@PathVariable String username,@PathVariable String id ) {
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
    public ResponseEntity<?> getAllContacts(@PathVariable String username, @RequestParam(value = "page",defaultValue = "0")int page, @RequestParam(value="size",defaultValue = "5") int size, @RequestParam(value="sortBy",defaultValue = "name") String sortBy, @RequestParam(value = "direction",defaultValue = "asc") String direction) {
        if(loginRepository.findByUsername(username)!=null) {
            Sort sort=direction.equals("desc")?Sort.by(sortBy).descending():Sort.by(sortBy).ascending();
            var pageable= PageRequest.of(page,size,sort);
            Page<Contact> temp=contactRepository.findByLogin_Username(username,pageable);
            System.out.println(temp.getTotalPages());
            return ResponseEntity.ok().body(contactRepository.findByLogin_Username(username,pageable));
        }
        else return ResponseEntity.status(404).body("Contact not found");
    }
//    search handler
    @GetMapping("/search")
    public ResponseEntity<?>getContactSearch(@PathVariable String username, @RequestParam(value="field",defaultValue = "name")String field,@RequestParam(value="keyword",defaultValue = "")String keyword) {
        log.info(field);
        log.info(keyword);
        return null;
    }
}
