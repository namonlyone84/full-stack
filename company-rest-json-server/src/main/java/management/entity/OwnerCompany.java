package management.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(schema = "full_stack", name = "owcom")
public class OwnerCompany {
    @Id
    @Column(name = "owcom_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "owComIdSequence")
    @SequenceGenerator(name = "owComIdSequence", sequenceName = "full_stack.seq_owcom_id", allocationSize = 1)
    private long id;

    @Column(name = "owcom_com_id")
    private long companyId;

    @Column(name = "owcom_owner_id")
    private long ownerId;

    @ManyToOne
    @JoinColumn(name = "owcom_com_id", insertable = false, updatable = false)
    private Company company;

    @ManyToOne
    @JoinColumn(name = "owcom_owner_id", insertable = false, updatable = false)
    private Owner owner;
}
