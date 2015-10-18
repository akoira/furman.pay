package furman.pay.model.day;

import furman.pay.model.PayOrder;
import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by akoiro on 10/18/15.
 */

@Entity
@Document
public class OrderValue {

    @DBRef
    private PayOrder order;

    @Indexed(unique = true)
    private String service;

    private Double value = 0d;

    private List<ShiftValue> shiftValues = new ArrayList<>();

    public PayOrder getOrder() {
        return order;
    }

    public void setOrder(PayOrder order) {
        this.order = order;
    }

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

    public List<ShiftValue> getShiftValues() {
        return shiftValues;
    }

    public void setShiftValues(List<ShiftValue> shiftValues) {
        this.shiftValues = shiftValues;
    }
}
