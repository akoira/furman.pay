'use strict';

angular.module('app.service').factory('dayShiftService', DayShiftService);

function DayShiftService($http, commonUtils) {
    var baseUrl = "/api/pay/dayShiftService";

    var service = {};

    service.findAllForDay = findAllForDay;
    service.removeDayOrderFromDayShift = removeDayOrderFromDayShift;

    function findAllForDay(day) {
        return $http.get(baseUrl + "/findAllForDay?dayId=" + day.id);
    }

    function removeDayOrderFromDayShift(dayOrder, dayShift) {
        dayShift.orders.splice(dayShift.orders.indexOf(dayOrder), 1);
        commonUtils.removeFromArrayByFilter(dayShift.values, {order: {id: dayOrder.id}});
    }

    return service;
}
