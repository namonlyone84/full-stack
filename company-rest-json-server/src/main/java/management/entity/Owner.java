package management.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(schema = "full_stack", name = "owner")
public class Owner {
    public static final String OWNER_FILTERING =
            "SELECT o " +
                    "FROM Owner o " +
                    "WHERE lower(coalesce(concat(o.id, ''), '')) LIKE :id " +
                    "      AND lower(coalesce(o.name, '')) LIKE :name ";


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ownerIdSequence")
    @SequenceGenerator(name = "ownerIdSequence", sequenceName = "full_stack.seq_owner_id", allocationSize = 1)
    @Column(name = "owner_id")
    private long id;

    @Column(name = "owner_name")
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OwnerCompany> ownedCompanies;
}
