package furman.pay.model;

import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDate;

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
}
