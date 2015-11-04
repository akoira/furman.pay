package furman.pay.model.day;

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
    private DayShift dayShift;

    @NotNull
    private Double value;

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public DayShift getDayShift() {
        return dayShift;
    }

    public void setDayShift(DayShift dayShift) {
        this.dayShift = dayShift;
    }
}
