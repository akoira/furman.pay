'use strict';

angular.module('app.rest').service('orderRepository', OrderRepository);

function OrderRepository($http) {

    var service = {};

    service.getAll = getAll;
    service.getOne = getById;

    function getById(orderId) {
        return $http.get('/api/core/order?id=' + orderId);
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
