package furman.pay.model.day;

import furman.pay.model.Employee;
import furman.pay.model.Shift;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;

/**
 * Created by akoiro on 9/19/15.
 */
public class DayShift {
    @DBRef
    private Shift shift;

    @DBRef
    private List<Employee> employees;
}
