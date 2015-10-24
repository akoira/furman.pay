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
            employeeRepository.save(vm.employee);
        } else {
            employeeRepository.create(vm.employee);
            employeeEditorService.employeeAdded(vm.employee);
        }
        vm.employee = null;
        vm.dataLoading = false;
    }
}
