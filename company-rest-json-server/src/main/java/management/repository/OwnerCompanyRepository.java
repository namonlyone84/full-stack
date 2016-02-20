package management.repository;

import management.entity.Owner;
import management.entity.OwnerCompany;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource
public interface OwnerCompanyRepository extends CrudRepository<OwnerCompany, Long> {

    @Query(value = "Select count(owCom.id) from OwnerCompany owCom where owCom.ownerId= :ownerId", nativeQuery = false)
    int numberCompaniesByOwner(@Param("ownerId") Long ownerId);

    @Override
    @RestResource(exported = false)
    void delete(Iterable<? extends OwnerCompany> users);

    @Override
    @RestResource(exported = false)
    void deleteAll();
}
