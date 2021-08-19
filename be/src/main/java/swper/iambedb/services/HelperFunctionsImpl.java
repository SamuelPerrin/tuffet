package swper.iambedb.services;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.resource.OAuth2AccessDeniedException;
import org.springframework.stereotype.Service;

@Service(value = "helperFunctions")
public class HelperFunctionsImpl implements HelperFunctions {
    @Override
    public boolean isAuthorizedToMakeChange(String username) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (username.equalsIgnoreCase(
                authentication.getName().toLowerCase()) ||
                authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))
        ) {
            return true;
        } else {
            throw new OAuth2AccessDeniedException();
        }
    }
}
