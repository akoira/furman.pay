package furman.pay.model.day;

import furman.pay.model.AObject;
import furman.pay.model.PayOrder;
import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

/**
 * akoiro - 10/19/15.
 */
@Entity
@Document
public class DayOrder extends AObject {

    @DBRef
    @NotNull
    private PayOrder payOrder;

    @DBRef
    @NotNull
    private Day day;

    private List<OrderValue> orderValues = new ArrayList<>();

    public PayOrder getPayOrder() {
        return payOrder;
    }

    public void setPayOrder(PayOrder payOrder) {
        this.payOrder = payOrder;
    }

    public List<OrderValue> getOrderValues() {
        return orderValues;
    }

    public void setOrderValues(List<OrderValue> orderValues) {
        this.orderValues = orderValues;
    }

    public Day getDay() {
        return day;
    }

    public void setDay(Day day) {
        this.day = day;
    }
}
