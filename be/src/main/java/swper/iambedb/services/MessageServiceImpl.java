package swper.iambedb.services;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import swper.iambedb.exceptions.ResourceNotFoundException;
import swper.iambedb.models.Message;
import swper.iambedb.models.User;
import swper.iambedb.repositories.MessageRepository;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service(value = "messageService")
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageRepository messagerepos;

    @Autowired
    private UserService userService;

    @Override
    public List<Message> findAll() {
        List<Message> messages = new ArrayList<>();
        messagerepos.findAll().iterator().forEachRemaining(messages::add);
        return messages;
    }

    public Message findMessageById(long id) {
        return messagerepos.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message id " + id + " not found!"));
    }

    @Transactional
    @Override
    public Message save(Message message) {
        Message newMessage = new Message();
        if (message.getMessageid() != 0) {
            messagerepos.findById(message.getMessageid())
                    .orElseThrow(() -> new ResourceNotFoundException("Message id " + message.getMessageid() + " not found!"));
            newMessage.setMessageid(message.getMessageid());
        }

        newMessage.setSubject(message.getSubject());
        newMessage.setBody(message.getBody());
        newMessage.setRead(false);

        if (message.getEmail() != null) {
            newMessage.setEmail(message.getEmail());
        }

        if (message.getUser() != null) {
            User addUser = userService.findUserById(message.getUser().getUserid());
            newMessage.setUser(addUser);
        }

        return messagerepos.save(newMessage);
    }

    @Transactional
    @Override
    public void delete(long id) {
        messagerepos.findById(id).orElseThrow(() -> new ResourceNotFoundException("Message id " + id + " not found!"));
        messagerepos.deleteById(id);
    }

    @Transactional

    @Override
    public Message updateRead(long id) {
        Message currentMessage = findMessageById(id);
        currentMessage.setRead(true);
        return currentMessage;
    }
}
