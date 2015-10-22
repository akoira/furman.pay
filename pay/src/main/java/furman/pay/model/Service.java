package furman.pay.model;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;

/**
 * akoiro - 10/22/15.
 */

@Entity
@Document
public class Service extends AObject {
    @Indexed(unique = false)
    @NotNull
    private String type;

    @NotNull
    private String unit;

    @NotNull
    private Integer index;

    @NotNull
    private Double rate;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }


    public static Service valueOf(String type, String name, String unit, int index) {
        Service service = new Service();
        service.setType(type);
        service.setName(name);
        service.setUnit(unit);
        service.setIndex(index);
        service.setRate(0.0);
        return service;
    }
}
