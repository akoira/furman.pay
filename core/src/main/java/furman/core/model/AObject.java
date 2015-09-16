package furman.core.model;

import javax.persistence.*;
import java.util.Date;

@MappedSuperclass
public abstract class AObject {
    @Id
    @SequenceGenerator(name = "IDGenerator", sequenceName = "HIBERNATE_SEQUENCE")
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "IDGenerator")
    @Column(name = "ID", nullable = false, insertable = true, updatable = false, unique = true)
    private Long id;

    @Column(nullable = false, columnDefinition = "bit default 0")
    private boolean deleted = false;

    @Column
    private Date created;

    @Column
    private Date modified;

    public Long getId() {
        return id;
    }

    public void setId(Long value) {
        this.id = value;
    }


    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getModified() {
        return modified;
    }

    public void setModified(Date modified) {
        this.modified = modified;
    }
}