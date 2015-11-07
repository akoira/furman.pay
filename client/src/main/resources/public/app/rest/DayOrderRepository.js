'use strict';

angular.module('app.rest').factory('dayOrderRepository', DayOrderRepository);

function DayOrderRepository($resource) {
    var basePath = '/api/pay/dayOrder/:id';
    var service = $resource(basePath, {}, {
        'getAll': {method: 'GET', isArray: true},
        'get': {method: 'GET'},
        'save': {method: 'POST'},
        'update': {method: 'PUT'},
        'remove': {method: 'DELETE'}
    });
    return service;
}
