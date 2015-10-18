'use strict';

angular.module('app.rest').service('DayOrderRepository', DayOrderRepository);

function DayOrderRepository($http) {
    var basePath = '/api/pay/dayOrder';

    var service = {};

    service.getByOrderId = getByOrderId;

    function getByOrderId(orderId) {
        return $http.get(basePath + "?" + "orderId=" + orderId).then(handleSuccess, handleError);
    }

    function create(dayOrder) {
        return $http.post(basePath, employee).then(handleSuccess, handleError('Ошибка'));
    }

    function save(dayOrder) {
        return $http.patch(basePath + "/" + day.id, day).then(handleSuccess, handleError('Ошибка'));
    }

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
