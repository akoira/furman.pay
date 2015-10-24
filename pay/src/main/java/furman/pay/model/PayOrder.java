package furman.pay.model;

import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Document
public class PayOrder extends AObject {

    @Indexed(unique = true)
    private Long orderId;

    private Long number;

    private LocalDate createdDate;

    private LocalDate workedDate;

    private LocalDate readyDate;

    @DBRef
    private PayCustomer customer;

    private List<WorkValue> workValues = new ArrayList<>();

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

    public List<WorkValue> getWorkValues() {
        return workValues;
    }

    public void setWorkValues(List<WorkValue> workValues) {
        this.workValues = workValues;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public PayCustomer getCustomer() {
        return customer;
    }

    public void setCustomer(PayCustomer customer) {
        this.customer = customer;
    }
}
