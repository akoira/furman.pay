package furman.pay.model.day;

import furman.pay.model.AObject;
import furman.pay.model.Employee;
import furman.pay.model.Work;
import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Entity
@Document
public class DayShift extends AObject {

    @DBRef
    private List<Employee> employees;

    @DBRef
    private List<Work> works;

    @DBRef
    private List<DayOrder> orders;

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
}
