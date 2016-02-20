package management.controller;

import management.entity.OwnerCompany;
import management.repository.OwnerCompanyRepository;
import org.apache.commons.collections4.IterableUtils;
import org.springframework.beans.factory.annotation.Autowired;
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

    /**
     * Override the POST method to allow adding multiple entries at a time
     * @param ownerCompanies beneficial owners to be added to companies
     */
    @RequestMapping(value = "/ownerCompanies", method = RequestMethod.POST)
    public ResponseEntity<List<OwnerCompany>> saveOwnerCompanies(@RequestBody List<OwnerCompany> ownerCompanies) {
        List<OwnerCompany> savedOwnerCompanies = IterableUtils.toList(ownerCompanyRepository.save(ownerCompanies));
        return new ResponseEntity<>(savedOwnerCompanies, HttpStatus.CREATED);
    }

    /**
     * Override the DELETE method to allow deleting multiple entries at a time
     * @param ownerCompanies beneficial owners to be deleted from company
     */
    @RequestMapping(value = "/ownerCompanies", method = RequestMethod.DELETE)
    public ResponseEntity deleteOwnerCompanies(@RequestBody List<Long> ownerCompanies) {
        ownerCompanyRepository.delete(ownerCompanyRepository.findAll(ownerCompanies));
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
