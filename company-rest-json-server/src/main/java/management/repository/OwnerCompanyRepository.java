package management.repository;

import management.entity.OwnerCompany;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface OwnerCompanyRepository extends CrudRepository<OwnerCompany, Long> {
}
