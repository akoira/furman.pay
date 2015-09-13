package by.dak.furman.web.controller;

import by.dak.furman.web.model.Contact;
import by.dak.furman.web.model.Order;
import by.dak.furman.web.model.OrderStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Collections;
import java.util.List;

/**
 * User: akoyro
 * Date: 5/12/2014
 * Time: 8:31 PM
 */
@Controller
public class OrderController {
    @RequestMapping("/orders")
    @ResponseBody
    public List<Order> getOrders(@RequestParam("page") int page, @RequestParam("limit") int limit) {
        Order order = new Order();
        order.setStatus(OrderStatus.develop);
        order.setNumber("02-22222222");
        order.setName("Order 1");
        Contact contact = new Contact();
        contact.setName("Andrey Koyro");
        order.setCustomer(contact);
        order.setDialer(new Contact());
        return Collections.singletonList(order);
    }
}
