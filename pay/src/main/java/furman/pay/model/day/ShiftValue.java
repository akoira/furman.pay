package furman.pay.model.day;

import furman.pay.model.Work;
import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;

/**
 * Created by akoiro on 10/18/15.
 */

@Entity
@Document
public class ShiftValue {

    @DBRef
    @NotNull
    private DayOrder order;

    @DBRef
    @NotNull
    private Work work;

    @NotNull
    private Double value;

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Work getWork() {
        return work;
    }

    public void setWork(Work work) {
        this.work = work;
    }

    public DayOrder getOrder() {
        return order;
    }

    public void setOrder(DayOrder order) {
        this.order = order;
    }
}
