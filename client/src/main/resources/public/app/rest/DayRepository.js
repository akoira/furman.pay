'use strict';

angular.module('app.rest').factory('dayRepository', DayRepository);

function DayRepository($resource, $log) {
    var basePath = '/api/pay/day/:id';
    var service = $resource(basePath, {}, {
        'getAll': {method: 'GET', isArray: true},
        'get': {method: 'GET'},
        'save': {method: 'POST'},
        'update': {method: 'PATCH'},
        'archive': {
            method: 'PATCH',
            transformRequest: function (data, headersGetter) {
                data.archived = true;
            }
        }
    });
    return service;
}
