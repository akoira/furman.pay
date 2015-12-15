'use strict';

angular.module('app.rest').factory('orderRepository', OrderRepository);

function OrderRepository($resource) {
    var basePath = '/api/core/order/:id';
    var service = $resource(basePath, {id: '@id'}, {
        'getAllBy': {
            method: 'GET',
            params: {orderNumber: '@orderNumber', number: 0, size: 1000, sort: 'readyDate,desc'}
        },
        'getAll': {method: 'GET', isArray: true},
        'get': {method: 'GET'},
        'save': {method: 'POST'},
        'update': {method: 'PATCH'},
        'remove': {method: 'DELETE'}
    });
    return service;
}
