'use strict';

angular.module('app.service').service('dayShiftService', DayShiftService);

function DayShiftService($http, shiftRepository) {
    var baseUrl = "/api/pay/dayShiftService";

    var service = {};

    service.findAllForDay = findAllForDay;

    function findAllForDay(day) {
        return $http.get(baseUrl + "/findAllForDay?dayId=" + day.id);
    }

    return service;
}
