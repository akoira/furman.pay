package furman.core.model;

import javax.persistence.*;

/**
 * akoiro - 10/19/15.
 */
@Entity
@Table(name = "COMMON_DATA")
public class CommonData extends AObject {

    @Column(name = "CTYPE", nullable = false)
    private String type;

    @Column(nullable = false)
    private String service = "";

    @Column(nullable = false)
    private String name = "";

    @Column(name = "AMOUNT", nullable = false)
    private Double count = 0d;

    @ManyToOne(cascade = CascadeType.REFRESH)
    private AOrder order;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getCount() {
        return count;
    }

    public void setCount(Double count) {
        this.count = count;
    }

    public AOrder getOrder() {
        return order;
    }

    public void setOrder(AOrder order) {
        this.order = order;
    }
}
