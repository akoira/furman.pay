'use strict';

angular.module('app.rest').factory('dayOrderRepository', DayOrderRepository);

function DayOrderRepository($resource) {
    var basePath = '/api/pay/dayOrder/:id';
    var service = $resource(basePath, {id: '@id'}, {
        'getAll': {method: 'GET', isArray: true},
        'get': {method: 'GET'},
        'save': {method: 'POST'},
        'update': {method: 'PATCH'},
        'remove': {method: 'DELETE'}
    });
    return service;
}
