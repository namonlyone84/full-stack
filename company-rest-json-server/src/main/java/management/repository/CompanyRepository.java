package management.repository;

import management.entity.Company;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CompanyRepository extends CrudRepository<Company, Long> {
}
