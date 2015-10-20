package furman.pay.model;

import furman.pay.model.day.OrderValue;
import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by akoiro on 9/13/15.
 */

@Entity
public class PayOrder extends AObject {

    @Indexed(unique = true)
    private Long orderId;

    private Long number;

    private LocalDate createdDate;

    private LocalDate workedDate;

    private LocalDate readyDate;


    private List<OrderValue> orderValues = new ArrayList<>();

    public Long getNumber() {
        return number;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public LocalDate getWorkedDate() {
        return workedDate;
    }

    public void setWorkedDate(LocalDate productionDate) {
        this.workedDate = productionDate;
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

    public List<OrderValue> getOrderValues() {
        return orderValues;
    }

    public void setOrderValues(List<OrderValue> orderValues) {
        this.orderValues = orderValues;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }
}
