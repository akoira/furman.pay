'use strict';

angular.module('app.employee.edit', ['ui.grid', "ui.grid.selection"]).controller('EmployeeEditController', EmployeeEditController);

function EmployeeEditController($scope, $http, $log, EmployeeRepository) {
    var vm = this;
    vm.dataLoading = false;
    vm.value = null;

    vm.gridOptions = {};

    vm.isCollapsed = true;

    vm.gridOptions.onRegisterApi = function (gridApi) {
        //set gridApi on scope
        vm.gridApi = gridApi;
    };

    $http.get('app/data/works.columns.json')
        .success(function (data) {
            vm.gridOptions.columnDefs = data;
        });

    $http.get('app/data/works.json')
        .success(function (data) {
            vm.gridOptions.data = data;
        });

    vm.save = function () {
        vm.dataLoading = true;
        if (vm.value._links) {
            EmployeeRepository.save(vm.value);
        } else {
            EmployeeRepository.create(vm.value);
            vm.$parent.$broadcast('employeeAdded', vm.value);
        }
        vm.dataLoading = false;
    };

    vm.$on('employeeSelected', function (event, data) {
        $log.debug(event);
        vm.value = data;
        updateView();
    });

    var updateView = function () {
        if (vm.value) {
            angular.forEach(vm.value.works, function (id) {
                var values = jQuery.grep(vm.gridOptions.data,
                    function (e) {
                        return e.id == id;
                    });
                if (values.length > 0) {
                    vm.gridApi.selection.selectRow(values[0]);
                }
            })
        }
    };
}
