package swper.iambedb.services;

import swper.iambedb.models.Role;

import java.util.List;

public interface RoleService {
    List<Role> findAll();
    Role findRoleById(long id);
    Role findRoleByName(String name);
    Role save(Role role);
    void deleteAll();
}
