'use strict';

angular.module('app.service').factory('dayShiftService', DayShiftService);

function DayShiftService($http, commonUtils, dayShiftRepository) {
    var baseUrl = "/api/pay/dayShiftService";

    var service = {};

    service.save = save;
    service.update = update;
    service.findAllForDay = findAllForDay;
    service.removeDayOrderFromDayShift = removeDayOrderFromDayShift;

    function findAllForDay(day) {
        return $http.get(baseUrl + "/findAllForDay?dayId=" + day.id);
    }

    function removeDayOrderFromDayShift(dayOrder, dayShift) {
        dayShift.orders.splice(dayShift.orders.indexOf(dayOrder), 1);
        commonUtils.removeFromArrayByFilter(dayShift.values, {order: {id: dayOrder.id}});
        update(dayShift);
    }

    function update(dayShift) {
        return dayShiftRepository.update(prepareToSave(dayShift));
    }

    function save(dayShift) {
        return dayShiftRepository.save(prepareToSave(dayShift));
    }


    function prepareToSave(shift) {
        var toSave = jQuery.extend(true, {}, shift);

        shift.employees.forEach(function (employee, index) {
            toSave.employees[index] = "/api/pay/employee/" + employee.id;
        });

        shift.works.forEach(function (work, index) {
            toSave.works[index] = "/api/pay/work/" + work.id;
        });

        shift.orders.forEach(function (order, index) {
            toSave.orders[index] = "/api/pay/order/" + order.id;
        });

        shift.values.forEach(function (value, index) {
            toSave.values[index].order = "/api/pay/order/" + value.order.id;
            toSave.values[index].work = "/api/pay/work/" + value.work.id;
        });

        toSave.day = "/api/pay/day/" + shift.day.id;
        return toSave;
    }

    return service;
}
