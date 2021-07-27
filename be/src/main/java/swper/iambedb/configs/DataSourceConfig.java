package swper.iambedb.configs;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import javax.sql.DataSource;
/**
 * Configures which database we are using based on a property in application.properties
 */
@Configuration
public class DataSourceConfig {
    /**
     * The property from application properties. Defaults to H2
     */
    @Value("${local.run.db:h2}")
    private String dbValue;
    /**
     * A config var for the database link - defaults to nothing
     */
    @Value("${spring.datasource.url:}")
    private String dbURL;
    /**
     * The actual datasource configuration
     *
     * @return the datasource to use
     */
    @Bean
    public DataSource dataSource()
    {
        if (dbValue.equalsIgnoreCase("POSTGRESQL"))
        {
            HikariConfig config = new HikariConfig();
            config.setDriverClassName("org.postgresql.Driver");
            config.setJdbcUrl(dbURL);
            return new HikariDataSource(config);
        } else
        {
            // Assume H2
            String myURLString = "jdbc:h2:mem:testdb";
            String myDriverClass = "org.h2.Driver";
            String myDBUser = "sa";
            String myDBPassword = "";
            return DataSourceBuilder.create()
                    .username(myDBUser)
                    .password(myDBPassword)
                    .url(myURLString)
                    .driverClassName(myDriverClass)
                    .build();
        }
    }
}
