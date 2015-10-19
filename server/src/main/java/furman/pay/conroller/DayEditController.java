package furman.pay.conroller;

import furman.core.model.*;
import furman.core.repository.CommonDataRepository;
import furman.core.repository.OrderRepository;
import furman.pay.model.PayOrder;
import furman.pay.model.QPayOrder;
import furman.pay.model.day.Day;
import furman.pay.model.day.OrderValue;
import furman.pay.model.day.QDay;
import furman.pay.repository.PayOrderRepository;
import furman.pay.repository.day.DayOrderRepository;
import furman.pay.repository.day.DayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;

/**
 * akoiro - 9/24/15.
 */
@RestController
public class DayEditController {

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


    @RequestMapping("/dayEdit/getOrders")
    public Iterable<Order> getOrders(@RequestParam(value = "date", required = true) @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return orderRepository.findAll(QOrder.order.workedDailySheet.date.eq(date).and(QOrder.order.status.eq(OrderStatus.production)));
    }

    @RequestMapping("/dayEdit/getOrderCountsPerDay")
    public Iterable<DateWithOrderCount> getOrderCountsPerDay() {
        return orderRepository.getCountsPerDay(OrderStatus.production);
    }

    @RequestMapping("/dayEdit/getDay")
    public Day getDay(@RequestParam(value = "date", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return dayRepository.findOne(QDay.day.date.eq(date));
    }

    @RequestMapping("/dayEdit/getDays")
    public Iterable<Day> getDays(@RequestParam(value = "startDate", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                 @RequestParam(value = "endDate", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return dayRepository.findAll(QDay.day.date.goe(startDate).and(QDay.day.date.loe(endDate)));
    }

    @RequestMapping("/dayEdit/createNewDay")
    public Day createNewDay(@RequestParam(value = "date", required = true)
                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                            LocalDate date) {

        Day day = new Day();
        day.setDate(date);
        return dayRepository.save(day);
    }

    @RequestMapping("/dayEdit/getOrNewDay")
    public Day getOrNewDay(@RequestParam(value = "date", required = true)
                           @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                           LocalDate date) {

        Day day = getDay(date);
        if (day == null) {
            day = createNewDay(date);
        }
        return day;
    }

    @RequestMapping("/dayEdit/getOrNewPayOrder")
    public PayOrder getOrNewOrder(@RequestParam(value = "orderId", required = true)
                                  Long orderId) {
        PayOrder payOrder = payOrderRepository.findOne(QPayOrder.payOrder.orderId.eq(orderId));
        if (payOrder == null) {
            Order order = orderRepository.findOne(orderId);
            payOrder = new PayOrder();

            payOrder.setOrderId(order.getId());
            payOrder.setNumber(String.format("%s-%d", new SimpleDateFormat("MM").format(order.getCreatedDailySheet().getDate()), order.getOrderNumber()));
            payOrder.setName(order.getName());
            payOrder.setProductionDate(order.getWorkedDailySheet().getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
            payOrder.setReadyDate(order.getReadyDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
            payOrder = payOrderRepository.save(payOrder);

            HashMap<String, OrderValue> values = new HashMap<>();

            Iterable<CommonData> commonDatas = commonDataRepository.findAll(QCommonData.commonData.order.eq(order));
            commonDatas.forEach(commonData -> {
                OrderValue value = new OrderValue();
                value.setService(commonData.getService());
                value.setValue(commonData.getCount());
                values.put(value.getService(), value);
            });
            payOrder.setOrderValues(values);
            payOrder = payOrderRepository.save(payOrder);
        }
        return payOrder;
    }
}
