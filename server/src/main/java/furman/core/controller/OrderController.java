package furman.core.controller;

import furman.core.model.Order;
import furman.core.repository.OrderRepository;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by akoiro on 9/13/15.
 */
//@RestController
public class OrderController {
    //    @Autowired
    private OrderRepository orderRepository;

    //    @RequestMapping("/orders")
//    @ResponseBody
    public Iterable<Order> getOrders(@RequestParam("page") int page, @RequestParam("limit") int limit) {
        //return orderRepository.findAll(QOrder.order.status.eq(OrderStatus.production), QOrder.order.workedDailySheet.date.asc());
        return null;
    }

}
