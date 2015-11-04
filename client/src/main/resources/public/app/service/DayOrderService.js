'use strict';

angular.module('app.service').service('dayOrderService', DayOrderService);

function DayOrderService($http, dayOrderRepository) {
    var baseUrl = "/api/pay/dayOrderService";

    var service = {};

    service.deleteByDay = deleteByDay;
    service.createDayOrder = createDayOrder;

    function deleteByDay(day) {
        $http.put(baseUrl + "/deleteByDay", day);
    }

    function createDayOrder(day, payOrder) {
        return $http.get(baseUrl + "/createDayOrder?dayId=" + day.id + "&payOrderId=" + payOrder.id);
    }

    return service;
}
