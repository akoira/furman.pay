package furman.pay.model.day;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import furman.pay.model.AObject;
import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by akoiro on 9/19/15.
 */
@Document
@Entity
public class Day extends AObject {
    @Indexed(unique = true)
    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @NotNull
    private LocalDate date;

    private List<DayOrder> orders = new ArrayList<>();

    @DBRef
    private List<DayShift> shifts = new ArrayList<>();

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
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
