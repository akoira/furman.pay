'use strict';

angular.module('app.rest').service('serviceRepository', ServiceRepository);

function ServiceRepository($http, $log) {
    var basePath = '/api/pay/service';

    var service = {};
    service.getAll = getAll;

    function getAll() {
        return $http.get(basePath + '?archived=false');
    }
    return service;
}
