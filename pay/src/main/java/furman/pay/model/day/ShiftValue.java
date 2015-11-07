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
    private DayOrder dayOrder;

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

    public DayOrder getDayOrder() {
        return dayOrder;
    }

    public void setDayOrder(DayOrder dayOrder) {
        this.dayOrder = dayOrder;
    }

    public Work getWork() {
        return work;
    }

    public void setWork(Work work) {
        this.work = work;
    }
}
