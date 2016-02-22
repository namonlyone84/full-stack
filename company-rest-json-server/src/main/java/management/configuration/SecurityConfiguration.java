package management.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    /**
     * Disable CSRF (Cross-Site Request Forgery Prevention)
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        super.configure(http);
        http.csrf().disable();
    }

    /**
     * Register bean to allow any CORS (Cross-Origin Resource Sharing).
     */
    @Bean
    public FilterRegistrationBean corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfig = new CorsConfiguration();

        corsConfig.setAllowCredentials(true);
        corsConfig.addAllowedOrigin("*");
        corsConfig.addAllowedHeader("*");
        corsConfig.addAllowedMethod("OPTIONS");
        corsConfig.addAllowedMethod("HEAD");
        corsConfig.addAllowedMethod("GET");
        corsConfig.addAllowedMethod("PUT");
        corsConfig.addAllowedMethod("POST");
        corsConfig.addAllowedMethod("DELETE");
        corsConfig.addAllowedMethod("PATCH");
        source.registerCorsConfiguration("/**", corsConfig);

        final FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(new CorsFilter(source));
        filterRegistrationBean.setOrder(0);
        return filterRegistrationBean;
    }

    @Autowired
    protected void provideAuthenticationProvide(AuthenticationManagerBuilder managerBuilder) throws Exception {
        managerBuilder
                .inMemoryAuthentication()
                .withUser("admin").password("admin").roles("USER");
    }
}