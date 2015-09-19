package furman.pay.model;

import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Created by akoiro on 9/19/15.
 */
@Entity
@Document
public class Shift extends AObject {

    @DBRef
    private List<Employee> employees;
    private List<String> services;

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    public List<String> getServices() {
        return services;
    }

    public void setServices(List<String> services) {
        this.services = services;
    }
}
