package management.controller;

import management.entity.Company;
import management.entity.Owner;
import management.entity.OwnerCompany;
import management.repository.CompanyRepository;
import management.repository.OwnerCompanyRepository;
import management.repository.OwnerRepository;
import org.apache.commons.collections4.IterableUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@RepositoryRestController
public class RestController {
    @Autowired
    OwnerCompanyRepository ownerCompanyRepository;

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    OwnerRepository ownerRepository;

    /**
     * Override the POST method to allow adding multiple entries at a time
     *
     * @param ownerCompanies beneficial owners to be added to companies
     */
    @RequestMapping(value = "/ownerCompanies", method = RequestMethod.POST)
    public ResponseEntity<List<OwnerCompany>> saveOwnerCompanies(@RequestBody List<OwnerCompany> ownerCompanies) {
        List<OwnerCompany> savedOwnerCompanies = IterableUtils.toList(ownerCompanyRepository.save(ownerCompanies));
        return new ResponseEntity<>(savedOwnerCompanies, HttpStatus.CREATED);
    }

    /**
     * Override the DELETE method to allow deleting multiple entries at a time
     *
     * @param ownerCompanies beneficial owners to be deleted from company
     */
    @RequestMapping(value = "/ownerCompanies", method = RequestMethod.DELETE)
    public ResponseEntity deleteOwnerCompanies(@RequestBody List<Long> ownerCompanies) {
        ownerCompanyRepository.delete(ownerCompanyRepository.findAll(ownerCompanies));
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    /**
     * Override the filter companies by properties, convert param before query
     *
     */
    @RequestMapping(value = "/companies/search/byProperties", method = RequestMethod.GET)
    public ResponseEntity<Page<Company>> filterCompanyByProperties(@Param("id") String id, @Param("name") String name,
                                                   @Param("address") String address, @Param("city") String city,
                                                   @Param("email") String email, @Param("country") String country,
                                                   @Param("phone") String phone, Pageable pageable) {

        Page<Company> companies = companyRepository.byProperties(composeFilter(id), composeFilter(name), composeFilter(address),
                composeFilter(city), composeFilter(email), composeFilter(country), composeFilter(phone), pageable);

        return new ResponseEntity<>(companies, HttpStatus.CREATED);
    }

    /**
     * Override the filter owner by Properties, convert param before query
     *
     */
    @RequestMapping(value = "/owners/search/byProperties", method = RequestMethod.GET)
    public ResponseEntity<Page<Owner>> filterOwnerByProperties(@Param("id") String id, @Param("name") String name, Pageable pageable) {

        Page<Owner> owners = ownerRepository.byProperties(composeFilter(id), composeFilter(name), pageable);

        return new ResponseEntity<>(owners, HttpStatus.CREATED);
    }

    // Add wild card for string condition in JPQL
    private String composeFilter(String filterValue) {
        return StringUtils.isEmpty(filterValue) ? "%" : "%" + filterValue + "%";
    }
}
