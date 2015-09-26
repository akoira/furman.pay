package furman.pay.model.day;

import furman.pay.model.AObject;
import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Created by akoiro on 9/19/15.
 */
@Entity
@Document
public class DayOrder extends AObject {

    private Long coreOrderId;

    @DBRef
    private List<DayShift> shifts;

    public Long getCoreOrderId() {
        return coreOrderId;
    }

    public void setCoreOrderId(Long coreOrderId) {
        this.coreOrderId = coreOrderId;
    }

    public List<DayShift> getShifts() {
        return shifts;
    }

    public void setShifts(List<DayShift> shifts) {
        this.shifts = shifts;
    }
}
