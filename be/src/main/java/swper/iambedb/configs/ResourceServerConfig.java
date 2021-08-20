package swper.iambedb.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {
    private String RESOURCE_ID = "resource_id";

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception
    {
        resources.resourceId(RESOURCE_ID)
                .stateless(false);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception
    {
        http.authorizeRequests()
                .antMatchers("/",
                        "/h2-console/**",
                        "/webjars/**",
                        "/createnewuser",
                        "/users/user/register",
                        "/login")
                .permitAll()
                .antMatchers("/logout").authenticated()
                .antMatchers(HttpMethod.GET, "/users/**").authenticated()
                .antMatchers(HttpMethod.PATCH, "/users/**").authenticated()
                .antMatchers(HttpMethod.GET, "/poems/**").authenticated()
                .antMatchers(HttpMethod.POST, "/poems/poem").authenticated()
                .antMatchers(HttpMethod.PUT, "/poems/poem/**").authenticated()
                .antMatchers(HttpMethod.DELETE, "/poems/poem/**").authenticated()
                .antMatchers(HttpMethod.GET,"/messages/**").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/messages/**").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/messages/**").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/messages/**").permitAll()
                .anyRequest().denyAll()
                .and()
                .exceptionHandling()
                .accessDeniedHandler(new OAuth2AccessDeniedHandler());

        http.csrf().disable();
        http.headers().frameOptions().disable();
        http.logout().disable();
    }
}
