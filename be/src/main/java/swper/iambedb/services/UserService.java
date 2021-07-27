package swper.iambedb.services;

import swper.iambedb.models.User;

import java.util.List;

public interface UserService {
    List<User> findAll();
    User findByName(String name);
    User findUserById(long id);
    User save(User user);
    void deleteAll();
}
