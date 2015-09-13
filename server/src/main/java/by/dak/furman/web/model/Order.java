package by.dak.furman.web.model;

import furman.pay.model.AObject;

public class Order extends AObject {
    private String number;
    private OrderStatus status;
    private Contact dialer;
    private Contact customer;

    public Contact getDialer() {
        return dialer;
    }

    public void setDialer(Contact dialer) {
        this.dialer = dialer;
    }

    public Contact getCustomer() {
        return customer;
    }

    public void setCustomer(Contact customer) {
        this.customer = customer;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }
}
