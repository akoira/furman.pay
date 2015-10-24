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
public class Work extends AObject {
    @Indexed(unique = false)
    @NotNull
    private String type;

    @NotNull
    private String unit;

    @NotNull
    private Integer index;

    @NotNull
    private Double rate;

    private String description;

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


    public static Work valueOf(String type, String name, String unit, int index) {
        Work work = new Work();
        work.setType(type);
        work.setName(name);
        work.setUnit(unit);
        work.setIndex(index);
        work.setRate(0.0);
        return work;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
