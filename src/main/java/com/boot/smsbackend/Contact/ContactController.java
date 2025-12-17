package com.boot.smsbackend.Contact;

import com.boot.smsbackend.Login.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/")
    public ResponseEntity<?> getAllContacts(@PathVariable String username) {
        if(loginRepository.findByUsername(username)!=null) {
            return ResponseEntity.ok().body(contactRepository.findByLogin_Username(username));
        }
        else return ResponseEntity.status(404).body("Contact not found");
    }

}
