'use strict';

angular.module('app.rest.order', []).factory('OrderRest', ['$http', function ($http) {

    var service = {};

    service.getAll = getAll;

    function getAll() {
        return $http.get('/api/core/order');
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
}]);