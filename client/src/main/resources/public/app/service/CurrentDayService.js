'use strict';

angular.module('app.service').service('currentDayService', CurrentDayService);

function CurrentDayService($filter, commonUtils, dayOrderRepository, dayOrderService, dayShiftService) {
    var service = {};
    var listeners = [];

    service.day = null;
    service.addListener = addListener;
    service.getDate = getDate;
    service.dateOf = dateOf;
    service.dayOrders = [];
    service.dayShifts = [];

    service.addPayOrder = addPayOrder;
    service.addDayOrder = addDayOrder;
    service.getDayOrderByCoreOrderId = getDayOrderByCoreOrderId;
    service.removeDayOrder = removeDayOrder;
    service.changeDay = changeDay;


    function changeDay(newDay) {
        service.day = newDay;
        dayOrderService.findAllForDay(newDay).then(function (data) {
            service.dayOrders = data.data;
        });
        dayShiftService.findAllForDay(newDay).then(function (data) {
            service.dayShifts = data.data;
        });
        listeners.forEach(function (l) {
            l(newDay);
        });
    }

    function getDayOrderByCoreOrderId(coreOrderId) {
        var found = $filter('filter')(service.dayOrders, {payOrder: {orderId: coreOrderId}});
        return found.length > 0 ? found[0] : null;
    }


    function addPayOrder(payOrder) {
        var dayOrder = getDayOrderByCoreOrderId(payOrder.orderId);
        if (!dayOrder) {
            dayOrderService.createDayOrder(service.day, payOrder).then(function (data) {
                addDayOrder(data.data);
            });
        }
    }

    function addDayOrder(dayOrder) {
        service.dayOrders.push(dayOrder);
    }

    function removeDayOrder(dayOrder) {
        service.dayOrders.splice(service.dayOrders.indexOf(dayOrder), 1);
        $filter('filter')(service.dayShifts, function (dayShift) {
            dayShiftService.removeDayOrderFromDayShift(dayOrder, dayShift);
        });
        dayOrderRepository.remove({
            id: dayOrder.id
        });
    }

    function getDate() {
        return dateOf(service.day.date);
    }

    function dateOf(date) {
        return moment({year: date[0], month: date[1] - 1, day: date[2]}).toDate();
    }


    function addListener(listener) {
        listeners.push(listener);
    }

    return service;
}

