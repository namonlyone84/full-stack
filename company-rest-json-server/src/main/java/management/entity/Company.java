package management.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(schema = "full_stack", name = "company")
public class Company {
    public static final String COMPANY_FILTERING =
            "SELECT com " +
                    "FROM Company com " +
                    "WHERE lower(coalesce(concat(com.id, ''), '')) LIKE :id " +
                    "      AND lower(coalesce(com.name, '')) LIKE :name " +
                    "      AND lower(coalesce(com.address, '')) LIKE :address " +
                    "      AND lower(coalesce(com.city, '')) LIKE :city " +
                    "      AND lower(coalesce(com.email, '')) LIKE :email " +
                    "      AND lower(coalesce(com.country, '')) LIKE :country " +
                    "      AND lower(coalesce(com.phone, '')) LIKE :phone";

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

    @JsonIgnore
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OwnerCompany> ownerCompanies;
}
