'use strict';

angular.module('app.rest').service('ServiceRepository', ServiceRepository);

function ServiceRepository($http, $log) {
    var basePath = '/api/pay/service';

    var service = {};
    service.getAll = getAll;

    function getAll() {
        return $http.get(basePath + '?archived=false');
    }
}
