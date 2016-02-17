package management.configuration;

import management.security.authentication.LogoutHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

@Configuration
public class ApplicationConfiguration {

    @Bean
    LogoutSuccessHandler logoutSuccessHandler() {
        return new LogoutHandler();
    }
}
