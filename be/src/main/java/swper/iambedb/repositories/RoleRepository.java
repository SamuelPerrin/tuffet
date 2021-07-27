package swper.iambedb.repositories;

import org.springframework.data.repository.CrudRepository;
import swper.iambedb.models.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {
    Role findByName(String name);
}
