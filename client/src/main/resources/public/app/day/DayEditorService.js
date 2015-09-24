'use strict';

angular.module('app.day.edit').service('DayEditorService', DayEditorService);

DayEditorService.$inject = ['$http', '$log'];
function DayEditorService($http, $log) {

    var baseUrl = "/api/pay/dayEdit";
    var service = {};

    service.getOrders = getOrders;

    function getOrders(date) {
        return $http.get(baseUrl + '/getOrders?date=' + moment(date).format("YYYY-MM-DD"));
    }

    // private functions

    function handleSuccess(data) {
        return data;
    }

    function handleError(error) {
        return function () {
            return {success: false, message: error};
        };
    }

    return service;
}
