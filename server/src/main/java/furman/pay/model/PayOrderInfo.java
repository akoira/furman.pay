package furman.pay.model;

import furman.pay.model.day.DayOrder;
import furman.pay.model.day.DayShift;

import java.util.ArrayList;
import java.util.List;

/**
 * akoiro - 11/13/15.
 */
public class PayOrderInfo {
    private PayOrder payOrder;
    private List<DayOrder> dayOrders = new ArrayList<>();
    private List<DayShift> dayShifts = new ArrayList<>();

    public PayOrder getPayOrder() {
        return payOrder;
    }

    public void setPayOrder(PayOrder payOrder) {
        this.payOrder = payOrder;
    }

    public List<DayOrder> getDayOrders() {
        return dayOrders;
    }

    public void setDayOrders(List<DayOrder> dayOrders) {
        this.dayOrders = dayOrders;
    }

    public List<DayShift> getDayShifts() {
        return dayShifts;
    }

    public void setDayShifts(List<DayShift> dayShifts) {
        this.dayShifts = dayShifts;
    }
}
