package furman.pay.conroller;

import furman.pay.model.PayOrder;
import furman.pay.model.Work;
import furman.pay.model.WorkValue;
import furman.pay.model.day.DayOrder;
import furman.pay.model.day.OrderValue;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * akoiro - 1/27/16.
 */
public class CollectOrderValues {

    private PayOrder payOrder;
    private List<Work> works;
    private DayOrder firstDayOrder;

    private List<OrderValue> values = new ArrayList<>();

    public List<OrderValue> collect() {
        if (firstDayOrder != null) {
            collectFromFirstDayOrder();
        } else {
            collectFromPayOrder();
        }
        return values;
    }

    private void collectFromPayOrder() {
        works.stream().forEach(work -> {
            OrderValue orderValue = new OrderValue();
            orderValue.setValue(0.0);
            orderValue.setWork(work);
            values.add(orderValue);

            List<WorkValue> foundValues = payOrder.getWorkValues().stream()
                    .filter(value -> Objects.equals(value.getWork().getId(), work.getId()))
                    .collect(Collectors.toList());
            foundValues.forEach(value -> {
                double result = orderValue.getValue() + value.getValue();
                orderValue.setValue(result);
            });
        });
    }

    private void collectFromFirstDayOrder() {
        firstDayOrder.getOrderValues().stream().forEach(fov -> {
            OrderValue orderValue = new OrderValue();
            orderValue.setValue(fov.getValue());
            orderValue.setWork(fov.getWork());
            values.add(orderValue);
        });
    }

    public static CollectOrderValues valueOf(PayOrder payOrder, DayOrder firstDayOrder, List<Work> works) {
        CollectOrderValues result = new CollectOrderValues();
        result.payOrder = payOrder;
        result.firstDayOrder = firstDayOrder;
        result.works = new ArrayList<>(works);
        return result;
    }
}
