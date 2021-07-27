package swper.iambedb.repositories;

import org.springframework.data.repository.CrudRepository;
import swper.iambedb.models.User;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);
}
