package furman.pay.model.day;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import furman.pay.model.AObject;
import furman.pay.model.Shift;
import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by akoiro on 9/19/15.
 */
@Entity
@Document
public class Day extends AObject {
    @Indexed(unique = true)
    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    private LocalDate date;

    private List<OrderValue> orderValues = new ArrayList<>();

    @DBRef
    private List<Shift> shifts = new ArrayList<>();

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<OrderValue> getOrderValues() {
        return orderValues;
    }

    public void setOrderValues(List<OrderValue> orderValues) {
        this.orderValues = orderValues;
    }

    public List<Shift> getShifts() {
        return shifts;
    }

    public void setShifts(List<Shift> shifts) {
        this.shifts = shifts;
    }
}
