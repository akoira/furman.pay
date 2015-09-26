package furman.pay.model.day;

import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;

/**
 * Created by akoiro on 9/19/15.
 */
public class DayOrder {

    private Long coreOrderId;

    @DBRef
    private List<DayShift> shifts;
}
