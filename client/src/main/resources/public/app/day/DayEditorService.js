'use strict';

angular.module('app.day.edit').service('DayEditorService', DayEditorService);

DayEditorService.$inject = ['$http', '$log', 'DayRest', 'ShiftRest'];
function DayEditorService($http, $log, DayRest, ShiftRest) {

    var baseUrl = "/api/pay/dayEdit";
    var service = {};

    service.getOrders = getOrders;
    service.getOrderCountsPerDay = getOrderCountsPerDay;
    service.save = save;
    service.getDay = getDay;
    service.getOrNewDay = getOrNewDay;
    service.getDays = getDays;
    service.createNewDay = createNewDay;

    function createNewDay(date) {
        return $http.get(baseUrl + "/createNewDay?date=" +
            date.format("YYYY-MM-DD"));
    }

    function getDays(startDate, endDate) {
        return $http.get(baseUrl + "/getDays?startDate=" +
            startDate.format("YYYY-MM-DD") + "&" + "endDate=" + endDate.format("YYYY-MM-DD"));
    }

    function getDay(date) {
        return $http.get(baseUrl + '/getDay?date=' + date.format("YYYY-MM-DD"));
    }

    function getOrders(date) {
        return $http.get(baseUrl + '/getOrders?date=' + moment(date).format("YYYY-MM-DD"));
    }

    function getOrderCountsPerDay() {
        return $http.get(baseUrl + '/getOrderCountsPerDay').then();
    }

    function getOrNewDay(date) {
        return $http.get(baseUrl + '/getOrNewDay?date=' + moment(date).format("YYYY-MM-DD"));
    }

    function save(day) {
        DayRest.save(day).then(handleSuccess, handleError);
    }

    // private functions

    function handleSuccess(data) {
        return data;
    }

    function handleError(error) {
        return function () {
            return {success: false, message: error.cause.message};
        };
    }

    return service;
}
