package management.entity;

import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.List;

@Data
@Entity
@Table(schema = "full_stack", name = "company")
public class Company {
    @Id
    @Column(name = "com_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "companyIdSequence")
    @SequenceGenerator(name = "companyIdSequence", sequenceName = "full_stack.seq_company_id", allocationSize = 1)
    private long id;

    @Column(name = "com_name")
    private String name;

    @Column(name = "com_address")
    private String address;

    @Column(name = "com_city")
    private String city;

    @Column(name = "com_country")
    private String country;

    @Column(name = "com_email")
    private String email;

    @Column(name = "com_phone")
    private String phone;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OwnerCompany> ownerCompanies;
}
