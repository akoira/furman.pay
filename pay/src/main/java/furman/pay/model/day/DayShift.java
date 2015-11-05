package furman.pay.model.day;

import furman.pay.model.AObject;
import furman.pay.model.Employee;
import furman.pay.model.Work;
import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Document
public class DayShift extends AObject {

    @DBRef
    @NotNull
    private Day day;

    @DBRef
    private List<Employee> employees = new ArrayList<>();

    @DBRef
    private List<Work> works = new ArrayList<>();

    @DBRef
    private List<DayOrder> orders = new ArrayList<>();

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    public List<Work> getWorks() {
        return works;
    }

    public void setWorks(List<Work> works) {
        this.works = works;
    }

    public List<DayOrder> getOrders() {
        return orders;
    }

    public void setOrders(List<DayOrder> orders) {
        this.orders = orders;
    }

    public Day getDay() {
        return day;
    }

    public void setDay(Day day) {
        this.day = day;
    }
}
