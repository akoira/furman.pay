package furman.pay.model;

import furman.pay.model.day.OrderValue;
import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by akoiro on 9/13/15.
 */

@Entity
public class PayOrder extends AObject {

    @Indexed(unique = true)
    private Long orderId;

    private String number;

    private LocalDate productionDate;

    private LocalDate readyDate;

    private Map<String, OrderValue> orderValues = new HashMap<>();

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public LocalDate getProductionDate() {
        return productionDate;
    }

    public void setProductionDate(LocalDate productionDate) {
        this.productionDate = productionDate;
    }

    public LocalDate getReadyDate() {
        return readyDate;
    }

    public void setReadyDate(LocalDate readyDate) {
        this.readyDate = readyDate;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Map<String, OrderValue> getOrderValues() {
        return orderValues;
    }

    public void setOrderValues(Map<String, OrderValue> orderValues) {
        this.orderValues = orderValues;
    }
}
