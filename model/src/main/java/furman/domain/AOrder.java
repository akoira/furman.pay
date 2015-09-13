package furman.domain;

import javax.persistence.*;
import java.sql.Date;

/**
 * User: akoyro
 * Date: 09.03.11
 * Time: 14:57
 */
@Entity
@Table(name = "FURN_ORDER")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "DISCRIMINATOR")
public abstract class AOrder extends AObject {
    @Column(name = "NAME", nullable = false, length = 255)
    private String name;
    @Column(name = "DESCRIPTION", nullable = true, columnDefinition = "longtext")
    private String description;

    /**
     * File uuid with representation of the order item saved in repository
     */
    @Column(name = "FILE_UUID", nullable = true)
    private String fileUuid;


    @Column(name = "COST", nullable = true)
    private Double cost;

    @Column(name = "DIALER_COST")
    private Double dialerCost;

    @Column(name = "STATUS", nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.design;


    @Column(name = "READY_DATE", nullable = true)
    private Date readyDate;

    @Column(name = "ORDER_NUMBER", nullable = false)
    private Long orderNumber;


    @ManyToOne(cascade =
            {
                    CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
            }, targetEntity = Customer.class)
    @JoinColumns(
            {
                    @JoinColumn(name = "FK_CUSTOMER_ID", nullable = false, referencedColumnName = "ID")
            })
    private Customer customer;


    @ManyToOne(cascade =
            {
                    CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
            }, targetEntity = Designer.class)
    @JoinColumns(
            {
                    @JoinColumn(name = "FK_DESIGNER_ID", nullable = true, referencedColumnName = "ID")
            })
    private Designer designer;

    @ManyToOne(cascade =
            {
                    CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
            }, targetEntity = Dailysheet.class)
    @JoinColumns(
            {
                    @JoinColumn(name = "FK_CREATED_DAILY_SHEET_ID", nullable = false, referencedColumnName = "ID")
            })
    private Dailysheet createdDailySheet;


    public Date getReadyDate() {
        return readyDate;
    }

    public void setReadyDate(Date readyDate) {
        this.readyDate = readyDate;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Customer getCustomer() {
        return customer;
    }


    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }


    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public String getFileUuid() {
        return fileUuid;
    }

    public void setFileUuid(String fileUuid) {
        this.fileUuid = fileUuid;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    @Transient
    public boolean isEditable() {
        return true;
    }

    public void setDesigner(Designer designer) {
        this.designer = designer;
    }

    public Designer getDesigner() {
        return designer;
    }

    public void setOrderNumber(Long orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Long getOrderNumber() {
        return orderNumber;
    }

    public Dailysheet getCreatedDailySheet() {
        return createdDailySheet;
    }

    public void setCreatedDailySheet(Dailysheet createdDailySheet) {
        this.createdDailySheet = createdDailySheet;
    }


    public Double getDialerCost() {
        return dialerCost;
    }

    public void setDialerCost(Double dialerCost) {
        this.dialerCost = dialerCost;
    }
}
