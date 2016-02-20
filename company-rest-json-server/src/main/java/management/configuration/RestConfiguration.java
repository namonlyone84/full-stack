package management.configuration;

import management.entity.Company;
import management.entity.Owner;
import management.entity.OwnerCompany;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

/**
 * Spring Data Rest is automatically configured by importing maven dependency
 *
 *         <dependency>
 *             <groupId>org.springframework.boot</groupId>
 *             <artifactId>spring-boot-starter-data-rest</artifactId>
 *         </dependency>
 *
 * This configuration is to override the available one on some settings.
 *
 * Along with Spring JPA, we can GET/POST/PUT/PATCH entities from data base by rest uri.
 * The returning entity is of JSON type and follows the HATEOAS format.
 * Refer to http://projects.spring.io/spring-data-rest/ for more information
 */
@Configuration
public class RestConfiguration extends RepositoryRestMvcConfiguration {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration repositoryRestConfiguration) {
        repositoryRestConfiguration
                .setSortParamName("sort")
                .setPageParamName("offset")
                .setLimitParamName("limit")
                .setBaseUri("rest");

        // Expose the ID property on returning json
        repositoryRestConfiguration.exposeIdsFor(Company.class, Owner.class, OwnerCompany.class);
        repositoryRestConfiguration.setReturnBodyOnCreate(true);
        repositoryRestConfiguration.setReturnBodyOnUpdate(true);
    }
}
