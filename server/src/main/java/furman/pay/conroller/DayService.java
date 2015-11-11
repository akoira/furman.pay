package furman.pay.conroller;

import furman.core.model.*;
import furman.core.repository.CommonDataRepository;
import furman.core.repository.OrderRepository;
import furman.pay.model.*;
import furman.pay.model.day.Day;
import furman.pay.model.day.QDay;
import furman.pay.repository.PayCustomerRepository;
import furman.pay.repository.PayOrderRepository;
import furman.pay.repository.WorkRepository;
import furman.pay.repository.day.DayOrderRepository;
import furman.pay.repository.day.DayRepository;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * akoiro - 9/24/15.
 */
@RestController
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
    private PayCustomerRepository payCustomerRepository;

    @RequestMapping("/dayService/getClosestWorkingDate")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    public LocalDate getClosestWorkingDate() {
        Iterable<Order> orders = orderRepository.findAll(new PageRequest(0, 1, Sort.Direction.DESC, "workedDailySheet.date"));
        try {
            return orders.iterator().next().getWorkedDailySheet().getDate();
        } catch (Exception e) {
            return LocalDate.now();
        }
    }

    @RequestMapping("/dayService/getOrders")
    public Iterable<Order> getOrders(@RequestParam(value = "date", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return orderRepository.findAll(QOrder.order.workedDailySheet.date.eq(date).and(QOrder.order.status.eq(OrderStatus.production)));
    }

    @RequestMapping("/dayService/getOrderCountsPerDay")
    public Iterable<DateWithOrderCount> getOrderCountsPerDay() {
        return orderRepository.getCountsPerDay(OrderStatus.production, OrderStatus.design);
    }

    @RequestMapping("/dayService/getDay")
    public Day getDay(@RequestParam(value = "date", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return dayRepository.findOne(QDay.day.date.eq(date));
    }

    @RequestMapping("/dayService/getDays")
    public Iterable<Day> getDays(@RequestParam(value = "startDate", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                 @RequestParam(value = "endDate", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return dayRepository.findAll(QDay.day.date.goe(startDate).and(QDay.day.date.loe(endDate)));
    }

    @RequestMapping("/dayService/createNewDay")
    public Day createNewDay(@RequestParam(value = "date", required = true)
                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                            LocalDate date) {

        Day day = new Day();
        day.setDate(date);
        return dayRepository.save(day);
    }

    @RequestMapping("/dayService/getOrNewDay")
    public Day getOrNewDay(@RequestParam(value = "date", required = true)
                           @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                           LocalDate date) {

        Day day = getDay(date);
        if (day == null) {
            day = createNewDay(date);
        }
        return day;
    }

    @RequestMapping("/dayService/getOrNewPayOrder")
    public PayOrder getOrNewPayOrder(@RequestParam(value = "orderId", required = true)
                                     Long orderId) {
        PayOrder payOrder = payOrderRepository.findOne(QPayOrder.payOrder.orderId.eq(orderId));
        if (payOrder == null) {
            Order order = orderRepository.findOne(orderId);

            payOrder = convert(order);

            PayCustomer customer = convert(order.getCustomer());
            customer = payCustomerRepository.save(customer);
            payOrder.setCustomer(customer);

            ArrayList<WorkValue> values = new ArrayList<>();
            Iterable<Work> works = workRepository.findAll(QWork.work.index.asc());
            works.forEach(work -> {
                WorkValue workValue = new WorkValue();
                workValue.setType(work.getCommonDataType());
                workValue.setDisplayName(work.getCommonDataType());
                workValue.setName(work.getCommonDataType());
                workValue.setValue(0.0);
                workValue.setWork(work);
                Iterable<CommonData> commonDatas = commonDataRepository.findAll(QCommonData.commonData.order.eq(order));
                commonDatas.forEach(commonData -> {
                    List<String> names = work.getCommonDataNames();
                    names.forEach(name -> {
                        if (commonData.getName().matches(name)) {
                            workValue.setValue(workValue.getValue() + commonData.getCount());
                            workValue.setType(commonData.getType());
                            workValue.setDisplayName(commonData.getService());
                            workValue.setName(commonData.getName());
                        }
                    });
                });


            });
            payOrder.setWorkValues(values);
            payOrder = payOrderRepository.save(payOrder);
        }
        return payOrder;
    }

    private PayOrder convert(Order order) {
        PayOrder payOrder = new PayOrder();

        payOrder.setOrderId(order.getId());
        payOrder.setNumber(order.getOrderNumber());
        payOrder.setName(order.getName());
        payOrder.setCreatedDate(order.getCreatedDailySheet().getDate());
        payOrder.setWorkedDate(order.getWorkedDailySheet().getDate());
        payOrder.setReadyDate(order.getReadyDate());

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
