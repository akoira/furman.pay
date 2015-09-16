package furman.core.model;

import javax.persistence.*;

/**
 * @author Denis Koyro
 * @version 0.1 16.10.2008
 * @introduced [Builder | Overview ]
 * @since 2.0.0
 */
@Entity
@DiscriminatorValue(value = "Order")
public class Order extends AOrder
{
    @ManyToOne(cascade =
            {
                    CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
            }, targetEntity = Dailysheet.class)
    @JoinColumns(
            {
                    @JoinColumn(name = "FK_WORKED_DAILY_SHEET_ID", nullable = true, referencedColumnName = "ID")
            })
    private Dailysheet workedDailySheet;

    public Dailysheet getWorkedDailySheet()
    {
        return workedDailySheet;
    }

    public void setWorkedDailySheet(Dailysheet workedDailySheet)
    {
        this.workedDailySheet = workedDailySheet;
    }
}