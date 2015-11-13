'use strict';

angular.module('app.rest').factory('employeeRepository', EmployeeRepository);

function EmployeeRepository($resource) {
    var basePath = '/api/pay/employee/:id';
    var service = $resource(basePath, {id: '@id'}, {
        'getAllVisible': {method: 'GET', params: {archived: false}},
        'getAll': {method: 'GET', params: {number: 0, size: 1000}},
        'get': {method: 'GET'},
        'save': {method: 'POST'},
        'update': {method: 'PATCH'},
        'archive': {
            method: 'PATCH'
        },
        'remove': {method: 'DELETE'}
    });
    return service;
}
