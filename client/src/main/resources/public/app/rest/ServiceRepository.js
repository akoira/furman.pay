'use strict';

angular.module('app.rest').service('serviceRepository', ServiceRepository);

function ServiceRepository($http, $log) {
    var basePath = '/api/pay/service';

    var service = {};
    service.getAll = getAll;
    service.save = save;

    function getAll() {
        return $http.get(basePath + '?archived=false');
    }

    function save(service) {
        return $http.patch(basePath + "/" + service.id, service);
    }

    return service;
}
