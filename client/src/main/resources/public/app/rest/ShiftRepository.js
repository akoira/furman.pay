'use strict';

angular.module('app.rest').factory('shiftRepository', ShiftRepository);

function ShiftRepository($resource) {
    var basePath = '/api/pay/shift/:id';
    var service = $resource(basePath, {id: '@id'}, {
        'getAll': {method: 'GET', isArray: true},
        'get': {method: 'GET'},
        'save': {method: 'POST'},
        'update': {method: 'PATCH'},
        'remove': {method: 'DELETE'}
    });
    return service;
}
