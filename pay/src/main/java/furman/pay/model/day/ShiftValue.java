package furman.pay.model.day;

import furman.pay.model.Shift;
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

    @NotNull
    private Shift shift;

    @DBRef
    @NotNull
    private Work work;

    @NotNull
    private Double value;

    public Shift getShift() {
        return shift;
    }

    public void setShift(Shift shift) {
        this.shift = shift;
    }

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
}
