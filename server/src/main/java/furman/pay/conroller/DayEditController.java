package furman.pay.conroller;

import furman.core.model.DateWithOrderCount;
import furman.core.model.Order;
import furman.core.model.OrderStatus;
import furman.core.model.QOrder;
import furman.core.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * Created by akoiro on 9/24/15.
 */
@RestController
public class DayEditController {

    @Autowired
    private OrderRepository orderRepository;


    @RequestMapping("/dayEdit/getOrders")
    public Iterable<Order> getOrders(@RequestParam(value = "date", required = true) @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return orderRepository.findAll(QOrder.order.workedDailySheet.date.eq(date).and(QOrder.order.status.eq(OrderStatus.production)));
    }

    @RequestMapping("/dayEdit/getOrderCountsPerDay")
    public Iterable<DateWithOrderCount> getOrderCountsPerDay() {
        return orderRepository.getCountsPerDay(OrderStatus.production);
    }

}
