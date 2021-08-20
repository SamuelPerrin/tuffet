package swper.iambedb.services;

import swper.iambedb.models.Message;

import java.util.List;

public interface MessageService {
    List<Message> findAll();
    Message findMessageById(long id);
    Message save(Message messsage);
    void delete(long id);
    Message updateRead(long id);
}
