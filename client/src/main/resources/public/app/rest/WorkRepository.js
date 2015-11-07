'use strict';

angular.module('app.rest').factory('workRepository', WorkRepository);

function WorkRepository($http, $log) {
    var basePath = '/api/pay/work';

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
