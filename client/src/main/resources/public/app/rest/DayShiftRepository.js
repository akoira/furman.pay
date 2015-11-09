'use strict';

angular.module('app.rest').factory('dayShiftRepository', DayShiftRepository);

function DayShiftRepository($resource) {
    var basePath = '/api/pay/dayShift/:id';
    var service = $resource(basePath, {id: '@id'}, {
        'getAll': {method: 'GET', isArray: true},
        'get': {method: 'GET'},
        'save': {method: 'POST'},
        'update': {method: 'PATCH'},
        'remove': {method: 'DELETE'}
    });
    return service;
}
