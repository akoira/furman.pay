package furman.pay.model.day;

import furman.pay.model.AObject;
import furman.pay.model.Employee;
import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Created by akoiro on 9/19/15.
 */
@Entity
@Document
public class DayShift extends AObject {

    @DBRef
    private List<Employee> employees;

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }
}
