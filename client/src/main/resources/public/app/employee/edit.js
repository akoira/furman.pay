'use strict';

angular.module('app.employee').controller('employeeEditCtrl', EmployeeEditCtrl);

function EmployeeEditCtrl($scope, $http, $log, employeeEditorService, employeeRepository) {
    var vm = this;
    vm.dataLoading = false;
    vm.collapsed = true;
    vm.employee = null;
    vm.save = save;
    vm.reset = reset;

    employeeEditorService.addEmployeeSelectedListener(function (employee) {
        vm.employee = employee;
        vm.collapsed = false;
    });

    function reset() {
        vm.employee = null;
    }

    function save() {
        vm.dataLoading = true;
        if (vm.employee.id) {
            employeeRepository.update(vm.employee).$promise.then(function (data) {
                vm.dataLoading = false;
                vm.employee = null;
            });
        } else {
            employeeRepository.save(vm.employee).$promise.then(function (data) {
                vm.employee.id = data.id;
                employeeEditorService.employeeAdded(vm.employee);
                vm.dataLoading = false;
                vm.employee = null;
            });
        }
    }
}
