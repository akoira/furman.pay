package furman.pay.conroller;

import furman.pay.model.WorkValue;
import furman.pay.model.day.Day;
import furman.pay.model.day.DayOrder;
import furman.pay.model.day.OrderValue;
import furman.pay.model.day.QDayOrder;
import furman.pay.repository.PayOrderRepository;
import furman.pay.repository.WorkRepository;
import furman.pay.repository.day.DayOrderRepository;
import furman.pay.repository.day.DayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * akoiro - 10/30/15.
 */
@RestController
public class DayOrderService {
    @Autowired
    private DayOrderRepository dayOrderRepository;

    @Autowired
    private WorkRepository workRepository;

    @Autowired
    private PayOrderRepository payOrderRepository;

    @Autowired
    private DayRepository dayRepository;

    @RequestMapping("/dayOrderService/deleteByDay")
    public void deleteByDay(Day day) {
        if (day.getId() != null) {
            Iterable<DayOrder> dayOrders = dayOrderRepository.findAll(QDayOrder.dayOrder.day.eq(day));
            dayOrderRepository.delete(dayOrders);
        }
    }

    @RequestMapping("/dayOrderService/createDayOrder")
    public DayOrder createDayOrder(@RequestParam(required = true) String dayId, @RequestParam String payOrderId) {
        DayOrder dayOrder = new DayOrder();
        dayOrder.setDay(dayRepository.findOne(dayId));
        dayOrder.setPayOrder(payOrderRepository.findOne(payOrderId));
        List<OrderValue> values = new ArrayList<>();
        workRepository.findAll().forEach(work -> {
            OrderValue orderValue = new OrderValue();
            orderValue.setValue(0.0);
            orderValue.setWork(work);
            values.add(orderValue);

            List<WorkValue> foundValues = dayOrder.getPayOrder().getWorkValues().stream().filter(value -> value.getWork().getId() == work.getId()).collect(Collectors.toList());
            double result = 0.0;
            for (WorkValue workValue : foundValues) {
                result += workValue.getValue();
                orderValue.setValue(result);
            }
            orderValue.setValue(0.0);
        });
        dayOrder.setOrderValues(values);
        dayOrderRepository.insert(dayOrder);
        return dayOrder;
    }
}
