package furman.pay.model.day;

import furman.pay.model.AObject;
import org.mongodb.morphia.annotations.Entity;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by akoiro on 9/19/15.
 */
@Entity
@Document
public class DayOrder extends AObject {
    private Long coreOrderId;
}
