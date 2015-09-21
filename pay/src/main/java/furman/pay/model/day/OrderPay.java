package furman.pay.model.day;

import furman.pay.model.PayRate;
import org.springframework.data.mongodb.core.mapping.DBRef;

/**
 * Created by akoiro on 9/19/15.
 */
public class OrderPay {

    private Double amount;

    private Double pay;

    @DBRef
    private PayRate payRate;
}
