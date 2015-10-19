package furman.pay.model.day;

import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by akoiro on 10/18/15.
 */

@Entity
@Document
public class OrderValue {
    @Indexed(unique = false)
    private String service;

    private Double value;

    private Map<String, ShiftValue> shiftValues = new HashMap<>();

    public String getService() {
        return service;
    }

    public void setService(String service) {
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
