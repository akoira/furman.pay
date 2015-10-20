package furman.pay.model.day;

import furman.pay.model.PayOrder;
import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * akoiro - 10/19/15.
 */
@Entity
@Document
public class DayOrder {
    @DBRef
    private PayOrder order;

    private List<OrderValue> orderValues = new ArrayList<>();

    public PayOrder getOrder() {
        return order;
    }

    public void setOrder(PayOrder order) {
        this.order = order;
    }

    public List<OrderValue> getOrderValues() {
        return orderValues;
    }

    public void setOrderValues(List<OrderValue> orderValues) {
        this.orderValues = orderValues;
    }
}
