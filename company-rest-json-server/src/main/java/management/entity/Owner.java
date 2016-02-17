package management.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(schema = "craft_beer", name = "role")
public class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ownerIdSequence")
    @SequenceGenerator(name = "ownerIdSequence", sequenceName = "full_stack.seq_owner_id", allocationSize = 1)
    @Column(name = "owner_id")
    private long id;

    @Column(name = "owner_name")
    private String name;

    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OwnerCompany> ownedCompanies;
}
