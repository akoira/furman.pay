package furman.core.model;

import java.util.Date;

/**
 * Created by akoiro on 9/24/15.
 */
public class DateWithOrderCount {
    private Date date;
    private long count;

    public DateWithOrderCount(long count, Date date) {
        this.count = count;
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
