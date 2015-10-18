'use strict';

angular.module('app.rest').factory('EmployeeRepository', EmployeeRepository);

function EmployeeRepository($http) {

    var service = {};

    service.create = create;
    service.getAll = getAll;
    service.save = save;
    service.archive = archive;


    function archive(employee) {
        employee.archived = true;
        return $http.patch(employee._links.self.href, employee).then(handleSuccess, handleError('Ошибка'));
    }

    function save(employee) {
        return $http.patch(employee._links.self.href, employee).then(handleSuccess, handleError('Ошибка'));
    }

    function create(employee) {
        return $http.post('/api/pay/employee', employee).then(handleSuccess, handleError('Ошибка'));
    }

    function getAll() {
        return $http.get('/api/pay/employee?archived=false');
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
}
