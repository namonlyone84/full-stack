package management.repository;

import management.entity.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

@RepositoryRestResource
public interface CompanyRepository extends CrudRepository<Company, Long> {

    @Query("Select company from Company company")
    Page<Company> offset(Pageable pageable);

    @Query(value = "Select c from Company c join c.ownerCompanies oc where oc.ownerId= :ownerId", nativeQuery = false)
    List<Company> byOwnerId(@Param("ownerId") Long ownerId);

    @Query(value = Company.COMPANY_FILTERING, nativeQuery = false)
    Page<Company> byProperties(@Param("id") String id, @Param("name") String name,
                                     @Param("address") String address, @Param("city") String city,
                                     @Param("email") String email, @Param("country") String country,
                                     @Param("phone") String phone, Pageable pageable);

    @Override
    @RestResource(exported = false)
    void delete(Iterable<? extends Company> companies);

    @Override
    @RestResource(exported = false)
    void deleteAll();

    @Override
    @RestResource(exported = false)
    List<Company> findAll();

    @Override
    @RestResource(exported = false)
    List<Company> findAll(Iterable<Long> companies);
}
