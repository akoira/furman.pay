package furman.pay.model.day;

import furman.pay.model.Service;
import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by akoiro on 10/18/15.
 */

@Entity
@Document
public class OrderValue {
    @DBRef
    @NotNull
    private Service service;

    @NotNull
    private Double value;

    @NotNull
    private Double rateValue;

    private Map<String, ShiftValue> shiftValues = new HashMap<>();

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Map<String, ShiftValue> getShiftValues() {
        return shiftValues;
    }

    public void setShiftValues(Map<String, ShiftValue> shiftValues) {
        this.shiftValues = shiftValues;
    }
}
