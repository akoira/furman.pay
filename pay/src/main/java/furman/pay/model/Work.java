package furman.pay.model;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.List;

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

    private String commonDataType;

    private List<String> commonDataNames;

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


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCommonDataType() {
        return commonDataType;
    }

    public void setCommonDataType(String commonDataType) {
        this.commonDataType = commonDataType;
    }

    public List<String> getCommonDataNames() {
        return commonDataNames;
    }

    public void setCommonDataNames(List<String> commonDataNames) {
        this.commonDataNames = commonDataNames;
    }
}
