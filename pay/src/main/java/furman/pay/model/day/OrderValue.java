package furman.pay.model.day;

import furman.pay.model.Work;
import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by akoiro on 10/18/15.
 */

@Entity
@Document
public class OrderValue {
    @DBRef
    @NotNull
    private Work work;

    @NotNull
    private Double value;

    @NotNull
    private Double rate;

    private Map<String, ShiftValue> shiftValues = new HashMap<>();

    public Work getWork() {
        return work;
    }

    public void setWork(Work work) {
        this.work = work;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public Map<String, ShiftValue> getShiftValues() {
        return shiftValues;
    }

    public void setShiftValues(Map<String, ShiftValue> shiftValues) {
        this.shiftValues = shiftValues;
    }
}
