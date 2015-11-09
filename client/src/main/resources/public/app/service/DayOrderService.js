'use strict';

angular.module('app.service').factory('dayOrderService', DayOrderService);

function DayOrderService($http, dayOrderRepository) {
    var baseUrl = "/api/pay/dayOrderService";

    var service = {};

    service.deleteByDay = deleteByDay;
    service.createDayOrder = createDayOrder;
    service.findAllForDay = findAllForDay;
    service.countForDay = countForDay;
    service.update = update;

    function deleteByDay(day) {
        $http.put(baseUrl + "/deleteByDay", day);
    }

    function createDayOrder(day, payOrder) {
        return $http.get(baseUrl + "/createDayOrder?dayId=" + day.id + "&payOrderId=" + payOrder.id);
    }

    function findAllForDay(day) {
        return $http.get(baseUrl + "/findAllForDay?dayId=" + day.id);
    }

    function countForDay(day) {
        return $http.get(baseUrl + "/countForDay?dayId=" + day.id);
    }

    function update(dayOrder) {
        return dayOrderRepository.update(prepareToSave(dayOrder));
    }

    function prepareToSave(dayOrder) {
        var toSave = jQuery.extend(true, {}, dayOrder);

        toSave.day = "/api/pay/day/" + dayOrder.day.id;
        toSave.payOrder = "/api/pay/payOrder/" + dayOrder.payOrder.id;

        toSave.orderValues.forEach(function (orderValue) {
            orderValue.work = "/api/pay/work/" + orderValue.work.id;
        });
        return toSave;
    }

    return service;
}
