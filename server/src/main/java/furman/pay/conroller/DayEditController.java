package furman.pay.conroller;

import com.mysema.query.Query;
import com.mysema.query.QueryFactory;
import furman.core.model.DateWithOrderCount;
import furman.core.model.Order;
import furman.core.model.OrderStatus;
import furman.core.model.QOrder;
import furman.core.repository.OrderRepository;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Calendar;
import java.util.Date;

/**
 * Created by akoiro on 9/24/15.
 */
@RestController
public class DayEditController {

    @Autowired
    private QueryFactory

    @Autowired
    private OrderRepository orderRepository;


    @RequestMapping("/dayEdit/getOrders")
    public Iterable<Order> getOrders(@RequestParam(value = "date", required = true) @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return orderRepository.findAll(QOrder.order.workedDailySheet.date.eq(date).and(QOrder.order.status.eq(OrderStatus.production)));
    }

    @RequestMapping("/dayEdit/getOrders")
    public Iterable<DateWithOrderCount> getDateWithOrderCount(@RequestParam(value = "date", required = true) @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {

        Query
        QOrder.order.createdDailySheet.date.between(DateUtils.truncate(date, Calendar.YEAR), DateUtils.truncate(DateUtils.addYears(date, 1), Calendar.YEAR));

        return orderRepository.findAll(QOrder.order.workedDailySheet.date.eq(date).and(QOrder.order.status.eq(OrderStatus.production)));
    }

}
