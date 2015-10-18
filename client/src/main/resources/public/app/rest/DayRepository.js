'use strict';

angular.module('app.rest').service('DayRepository', DayRepository);

function DayRepository($http, $log) {
    var basePath = '/api/pay/day';
    var service = {};

    service.create = create;
    service.getAll = getAll;
    service.save = save;
    service.archive = archive;

    function archive(day) {
        day.archived = true;
        return $http.patch(basePath + "/" + day.id, day).then(handleSuccess, handleError('Ошибка'));
    }

    function save(day) {
        return $http.patch(basePath + "/" + day.id, day).then(handleSuccess, handleError('Ошибка'));
    }

    function create(employee) {
        return $http.post(basePath, employee).then(handleSuccess, handleError('Ошибка'));
    }

    function getAll() {
        return $http.get(basePath + '?archived=false');
    }

    // private functions

    function handleSuccess(data) {
        return data;
    }

    function handleError(error) {
        return function () {
            $log.log(error);
            return error;
        };
    }

    return service;
}
