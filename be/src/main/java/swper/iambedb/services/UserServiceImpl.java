package swper.iambedb.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.resource.OAuth2AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import swper.iambedb.exceptions.ResourceNotFoundException;
import swper.iambedb.models.*;
import swper.iambedb.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service(value = "userService")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userrepos;

    @Autowired
    private RoleService roleService;

    @Autowired
    private PoemService poemService;

    @Autowired
    private HelperFunctions helperFunctions;

    public User findUserById(long id) {
        return userrepos.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User id " + id + " not found!"));
    }

    @Override
    public List<User> findAll() {
        List<User> list = new ArrayList<>();
        userrepos.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public User findByName(String name) {
        User uu = userrepos.findByUsername(name.toLowerCase());
        if (uu == null) {
            throw new ResourceNotFoundException("User name " + name + "not found!");
        }
        return uu;
    }

    @Transactional
    @Override
    public User save(User user) {
        User newUser = new User();
        if (user.getUserid() != 0) {
            userrepos.findById(user.getUserid()).orElseThrow(() -> new ResourceNotFoundException("User id " + user.getUserid() + " not found!"));
        }

        newUser.setUsername(user.getUsername().toLowerCase());
        newUser.setPasswordNoEncrypt(user.getPassword());
        newUser.setEmail(user.getEmail().toLowerCase());

        newUser.getRoles().clear();
        for (UserRoles ur : user.getRoles()) {
            Role addRole = roleService.findRoleById(ur.getRole().getRoleid());
            newUser.getRoles().add(new UserRoles(newUser, addRole));
        }

        if (newUser.getRoles().size() == 0) {
            Role addRole = roleService.findRoleByName("USER");
            newUser.getRoles().add(new UserRoles(newUser, addRole));
        }

        return userrepos.save(newUser);
    }

    @Transactional
    @Override
    public User update(User user, long id) {
        User currentUser = findUserById(id);

        if (helperFunctions.isAuthorizedToMakeChange(currentUser.getUsername())) {
            if (user.getUsername() != null) {
                currentUser.setUsername(user.getUsername().toLowerCase());
            }
            if (user.getPassword() != null) {
                currentUser.setPasswordNoEncrypt(user.getPassword());
            }
            if (user.getEmail() != null) {
                currentUser.setEmail(user.getEmail().toLowerCase());
            }

            if (user.getRoles().size() > 0) {
                currentUser.getRoles().clear();
                for (UserRoles ur : user.getRoles()) {
                    Role addRole = roleService.findRoleById(ur.getRole().getRoleid());
                    currentUser.getRoles().add(new UserRoles(currentUser, addRole));
                }
            }

            if (user.getPoems().size() > 0) {
                currentUser.getPoems().clear();
                for (UserPoems up : user.getPoems()) {
                    Poem addPoem = poemService.findPoemById(up.getPoem().getPoemid());
                    currentUser.getPoems().add(new UserPoems(currentUser, addPoem));
                }
            }

            return userrepos.save(currentUser);
        } else {
            throw new OAuth2AccessDeniedException();
        }
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @Override
    public void deleteAll() {
        userrepos.deleteAll();
    }
}
