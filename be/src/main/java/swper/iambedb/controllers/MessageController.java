package swper.iambedb.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swper.iambedb.models.Message;
import swper.iambedb.services.MessageService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @GetMapping(value = "/message/{id}", produces = "application/json")
    public ResponseEntity<?> getMessageById(@PathVariable long id) {
        Message m = messageService.findMessageById(id);
        return new ResponseEntity<>(m, HttpStatus.OK);
    }

    @GetMapping(value = "/messages", produces = "application/json")
    public ResponseEntity<?> listAllMessages() {
        List<Message> messages = messageService.findAll();
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @PostMapping(value = "/message", consumes = "application/json")
    public ResponseEntity<?> addNewMessage(@Valid @RequestBody Message newmessage) {
        newmessage.setMessageid(0);
        messageService.save(newmessage);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/message/{id}")
    public ResponseEntity<?> deleteMessageById(@PathVariable long id) {
        messageService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(value = "/message/{id}", produces = "application/json")
    public ResponseEntity<?> markReadById(@PathVariable long id) {
        Message updatedMessage = messageService.updateRead(id);
        return new ResponseEntity<>(updatedMessage, HttpStatus.OK);
    }
}
