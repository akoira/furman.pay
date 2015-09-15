package furman.pay.model;

import org.mongodb.morphia.annotations.Entity;

import java.util.List;

/**
 * Created by akoiro on 9/15/15.
 */
@Entity
public class Employee extends AObject {
    private String firstName;
    private String lastName;

    private List<String> services;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public List<String> getServices() {
        return services;
    }

    public void setServices(List<String> services) {
        this.services = services;
    }
}
