package furman.pay.model.day;

import furman.pay.model.AObject;
import furman.pay.model.PayOrder;
import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.Map;

/**
 * akoiro - 10/19/15.
 */
@Entity
@Document
public class DayOrder extends AObject {
    @DBRef
    private PayOrder order;

    private Map<String, OrderValue> orderValues = new HashMap<>();

    public PayOrder getOrder() {
        return order;
    }

    public void setOrder(PayOrder order) {
        this.order = order;
    }

    public Map<String, OrderValue> getOrderValues() {
        return orderValues;
    }

    public void setOrderValues(Map<String, OrderValue> orderValues) {
        this.orderValues = orderValues;
    }
}
