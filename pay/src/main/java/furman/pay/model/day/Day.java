package furman.pay.model.day;

import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Date;
import java.util.List;

/**
 * Created by akoiro on 9/19/15.
 */
public class Day {
    private Date date;

    @DBRef
    private List<DayShift> shifts;

    private List<DayOrder> dayOrders;


    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<DayShift> getShifts() {
        return shifts;
    }

    public void setShifts(List<DayShift> shifts) {
        this.shifts = shifts;
    }
}
