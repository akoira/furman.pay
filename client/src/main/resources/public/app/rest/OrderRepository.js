'use strict';

angular.module('app.rest').factory('orderRepository', OrderRepository);

function OrderRepository($http) {

    var service = {};

    service.getAll = getAll;
    service.getOne = getById;
    service.getByOrderNumber = getByOrderNumber;

    function getById(orderId) {
        return $http.get('/api/core/order?id=' + orderId);
    }

    function getByOrderNumber(orderNumber) {
        return $http.get('/api/core/order?orderNumber=' + orderNumber);
    }

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
}
