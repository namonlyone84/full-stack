package management.repository;

import management.entity.Company;
import management.entity.Owner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource
public interface OwnerRepository extends CrudRepository<Owner, Long> {
    @Query("Select owner from Owner owner")
    Page<Company> offset(Pageable pageable);

    @Query(value = Owner.OWNER_FILTERING, nativeQuery = false)
    Page<Owner> byProperties(@Param("id") String autId, @Param("name") String name, Pageable pageable);

    @Override
    @RestResource(exported = false)
    void delete(Iterable<? extends Owner> users);

    @Override
    @RestResource(exported = false)
    void deleteAll();
}
