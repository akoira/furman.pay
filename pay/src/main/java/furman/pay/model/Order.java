package furman.pay.model;

import org.mongodb.morphia.annotations.Entity;

import java.util.Date;

/**
 * Created by akoiro on 9/13/15.
 */

@Entity
public class Order extends AObject {

    private String number;

    private Date productionDate;

    private Date readyDate;

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Date getProductionDate() {
        return productionDate;
    }

    public void setProductionDate(Date productionDate) {
        this.productionDate = productionDate;
    }

    public Date getReadyDate() {
        return readyDate;
    }

    public void setReadyDate(Date readyDate) {
        this.readyDate = readyDate;
    }
}
