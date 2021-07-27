package swper.iambedb.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import swper.iambedb.exceptions.ResourceNotFoundException;
import swper.iambedb.models.Role;
import swper.iambedb.models.User;
import swper.iambedb.repositories.RoleRepository;
import swper.iambedb.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service(value = "roleService")
public class RoleServiceImpl implements RoleService {
    @Autowired
    RoleRepository rolerepos;

    @Autowired
    UserRepository userrepos;

    @Override
    public List<Role> findAll() {
        List<Role> list = new ArrayList<>();
        rolerepos.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public Role findRoleById(long id) {
        return rolerepos.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role id " + id + " not found!"));
    }


    @Override
    public Role findRoleByName(String name) {
        Role rr = rolerepos.findByName(name.toUpperCase());
        if (rr == null) {
            throw new ResourceNotFoundException("Role name " + name + "not found!");
        }
        return rr;
    }

    @Transactional
    @Override
    public Role save(Role role) {
        if (role.getUsers().size() > 0) {
            throw new ResourceNotFoundException("User Roles are not updated through Role.");
        }

        return rolerepos.save(role);
    }

    @Transactional
    @Override
    public void deleteAll() {
        rolerepos.deleteAll();
    }
}
