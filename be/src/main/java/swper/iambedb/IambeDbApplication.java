package swper.iambedb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
@PropertySource(value = "file:/Users/Sam/OneDrive/Desktop/iambedb.properties", ignoreResourceNotFound = true)
public class IambeDbApplication {

    public static void main(String[] args) {
        SpringApplication.run(IambeDbApplication.class, args);
    }

}
