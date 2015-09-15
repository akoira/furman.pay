'use strict';

angular.module('app.service.employee', []).factory('EmployeeService', ['$http', function ($http) {

    var service = {};

    service.create = create;

    function create(employee) {
        return $http.post('/api/pay/employee', employee).then(handleSuccess, handleError('Ошибка'));
    }

    // private functions

    function handleSuccess(data) {
        return data;
    }

    function handleError(error) {
        return function () {
            return {success: false, message: error};
        };
    }

    return service;
}]);
