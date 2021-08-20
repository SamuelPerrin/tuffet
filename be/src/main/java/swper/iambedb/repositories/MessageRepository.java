package swper.iambedb.repositories;

import org.springframework.data.repository.CrudRepository;
import swper.iambedb.models.Message;

public interface MessageRepository extends CrudRepository<Message, Long> {
}
