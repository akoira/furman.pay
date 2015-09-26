package furman.pay.model.day;

import furman.pay.model.AObject;
import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

/**
 * Created by akoiro on 9/19/15.
 */
@Entity
@Document
public class Day extends AObject {
    @Indexed(unique = true)
    private Date date;

    @DBRef
    private List<DayShift> shifts;

    @DBRef
    private List<DayOrder> orders;

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

    public List<DayOrder> getOrders() {
        return orders;
    }

    public void setOrders(List<DayOrder> orders) {
        this.orders = orders;
    }
}
