package furman.rest;

import furman.model.Order;
import furman.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by akoiro on 9/13/15.
 */
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @RequestMapping("/orders")
    @ResponseBody
    public Iterable<Order> getOrders(@RequestParam("page") int page, @RequestParam("limit") int limit) {
        return orderRepository.findAll();
    }

}
