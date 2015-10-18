package furman.pay.model.day;

import furman.pay.model.Shift;
import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by akoiro on 10/18/15.
 */

@Entity
@Document
public class ShiftValue {

    private Double value;

    @DBRef
    private Shift shift;

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
}
