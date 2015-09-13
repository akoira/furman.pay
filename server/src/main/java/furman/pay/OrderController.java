package furman.pay;

import furman.domain.Order;
import furman.pay.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by akoiro on 9/13/15.
 */
@RestController
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @RequestMapping("/orders")
    @ResponseBody
    public Iterable<Order> getOrders(@RequestParam("page") int page, @RequestParam("limit") int limit) {
        //return orderRepository.findAll(QOrder.order.status.eq(OrderStatus.production), QOrder.order.workedDailySheet.date.asc());
        return null;
    }

}
