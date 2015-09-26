'use strict';

angular.module('app.day.edit').service('DayEditorService', DayEditorService);

DayEditorService.$inject = ['$http', '$log', 'DayRest'];
function DayEditorService($http, $log, DayRest) {

    var baseUrl = "/api/pay/dayEdit";
    var service = {};

    service.getOrders = getOrders;
    service.getOrderCountsPerDay = getOrderCountsPerDay;
    service.save = save;

    function getOrders(date) {
        return $http.get(baseUrl + '/getOrders?date=' + moment(date).format("YYYY-MM-DD"));
    }

    function getOrderCountsPerDay() {
        return $http.get(baseUrl + '/getOrderCountsPerDay').then();
    }

    function save(day) {
        var result = {
            date: day.date
        };

        DayRest.create(result).then(handleSuccess, handleError);
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
