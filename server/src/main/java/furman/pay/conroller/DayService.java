package furman.pay.conroller;

import furman.core.model.*;
import furman.core.repository.CommonDataRepository;
import furman.core.repository.OrderRepository;
import furman.pay.model.*;
import furman.pay.model.day.*;
import furman.pay.repository.DayShiftRepository;
import furman.pay.repository.PayCustomerRepository;
import furman.pay.repository.PayOrderRepository;
import furman.pay.repository.WorkRepository;
import furman.pay.repository.day.DayOrderRepository;
import furman.pay.repository.day.DayRepository;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.querydsl.QSort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

/**
 * akoiro - 9/24/15.
 */
@RestController
@RequestMapping("/dayService")
public class DayService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private DayRepository dayRepository;

    @Autowired
    private PayOrderRepository payOrderRepository;

    @Autowired
    private DayOrderRepository dayOrderRepository;

    @Autowired
    private CommonDataRepository commonDataRepository;

    @Autowired
    private WorkRepository workRepository;

    @Autowired
    private DayShiftRepository dayShiftRepository;

    @Autowired
    private PayCustomerRepository payCustomerRepository;

    @RequestMapping("getClosestWorkingDate")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    public LocalDate getClosestWorkingDate() {
        Iterable<Order> orders = orderRepository.findAll(new PageRequest(0, 1, new QSort(QOrder.order.readyDate.desc())));
        try {
            return orders.iterator().next().getReadyDate();
        } catch (Exception e) {
            return LocalDate.now();
        }
    }

    @RequestMapping("getOrders")
    public Iterable<Order> getOrders(@RequestParam(value = "date", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return orderRepository.findAll(QOrder.order.readyDate.eq(date).and(QOrder.order.status.in(OrderStatus.design, OrderStatus.production)), QOrder.order.orderNumber.asc());
    }

    @RequestMapping("getOrderCountsPerDay")
    public Iterable<DateWithOrderCount> getOrderCountsPerDay() {
        return orderRepository.getCountsPerDay(OrderStatus.production, OrderStatus.design);
    }

    @RequestMapping("getDay")
    public Day getDay(@RequestParam(value = "date", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return dayRepository.findOne(QDay.day.date.eq(date));
    }

    @RequestMapping("getDays")
    public Iterable<Day> getDays(@RequestParam(value = "startDate", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                 @RequestParam(value = "endDate", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return dayRepository.findAll(QDay.day.date.goe(startDate).and(QDay.day.date.loe(endDate)));
    }

    @RequestMapping("createNewDay")
    public Day createNewDay(@RequestParam(value = "date", required = true)
                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                            LocalDate date) {

        Day day = new Day();
        day.setDate(date);
        return dayRepository.save(day);
    }

    @RequestMapping("getOrNewDay")
    public Day getOrNewDay(@RequestParam(value = "date", required = true)
                           @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                           LocalDate date) {

        Day day = getDay(date);
        if (day == null) {
            day = createNewDay(date);
        }
        return day;
    }

    @RequestMapping("getOrNewPayOrder")
    public PayOrder getOrNewPayOrder(@RequestParam(value = "orderId", required = true)
                                     Long orderId) {
        PayOrder payOrder = payOrderRepository.findOne(QPayOrder.payOrder.orderId.eq(orderId));
        if (payOrder == null) {
            Order order = orderRepository.findOne(orderId);

            payOrder = convert(order);

            PayCustomer customer = convert(order.getCustomer());
            customer = payCustomerRepository.save(customer);
            payOrder.setCustomer(customer);

            payOrder.setWorkValues(CreateWorkValues.valueOf(workRepository.findAll(QWork.work.index.asc()),
                    commonDataRepository.findAll(QCommonData.commonData.order.eq(order))).create());
            payOrder = payOrderRepository.save(payOrder);
        }
        return payOrder;
    }

    @RequestMapping("getPayOrderInfo")
    public PayOrderInfo getPayOrderInfo(@RequestParam(value = "payOrderId") String payOrderId) {
        PayOrderInfo payOrderInfo = new PayOrderInfo();
        PayOrder payOrder = payOrderRepository.findOne(payOrderId);
        payOrderInfo.setPayOrder(payOrder);
        Iterable<DayOrder> dayOrders = dayOrderRepository.findAll(QDayOrder.dayOrder.payOrder.eq(payOrder), QDayOrder.dayOrder.day.date.asc());
        dayOrders.forEach(dayOrder -> {
            payOrderInfo.getDayOrders().add(dayOrder);
            Iterable<DayShift> dayShifts = dayShiftRepository.findAll(QDayShift.dayShift.orders.contains(dayOrder));
            dayShifts.forEach(dayShift -> {
                payOrderInfo.getDayShifts().add(dayShift);
            });

        });
        return payOrderInfo;
    }


    private PayOrder convert(Order order) {
        PayOrder payOrder = new PayOrder();

        payOrder.setOrderId(order.getId());
        payOrder.setNumber(order.getOrderNumber());
        payOrder.setName(order.getName());
        payOrder.setCreatedDate(order.getCreatedDailySheet().getDate());
        payOrder.setWorkedDate(order.getWorkedDailySheet() != null ? order.getWorkedDailySheet().getDate() : null);
        payOrder.setReadyDate(order.getReadyDate());
        payOrder.setStatus(order.getStatus().name());

        return payOrder;
    }

    private WorkValue convert(CommonData commonData, Work work) {
        WorkValue workValue = new WorkValue();
        workValue.setType(commonData.getType());
        workValue.setDisplayName(commonData.getService());
        workValue.setName(commonData.getName());
        workValue.setValue(commonData.getCount());
        workValue.setWork(work);
        return workValue;
    }

    private PayCustomer convert(Customer customer) {
        try {
            PayCustomer payCustomer = new PayCustomer();
            BeanUtils.copyProperties(payCustomer, customer);
            return payCustomer;
        } catch (Exception e) {
            throw new IllegalArgumentException(e);
        }
    }
}
