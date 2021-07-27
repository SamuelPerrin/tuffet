package swper.iambedb.services;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import swper.iambedb.exceptions.ResourceNotFoundException;
import swper.iambedb.models.User;
import swper.iambedb.repositories.UserRepository;

@Service(value = "securityUserService")
public class SecurityUserServiceImpl implements UserDetailsService {
    /**
     * Ties this implementation to the User Repository so we can find a user in the database.
     */
    @Autowired
    private UserRepository userrepos;

    /**
     * Verifies that the user is correct and if so creates the authenticated user
     *
     * @param s The user name we are look for
     * @return a security user detail that is now an authenticated user
     * @throws swper.iambedb.exceptions.ResourceNotFoundException if the user name is not found
     */
    @Transactional
    @Override
    public UserDetails loadUserByUsername(String s)
            throws
            ResourceNotFoundException
    {
        User user = userrepos.findByUsername(s.toLowerCase());
        if (user == null)
        {
            throw new ResourceNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(),
                user.getPassword(),
                user.getAuthority());
    }
}
