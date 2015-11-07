'use strict';

angular.module('app.shift').controller('shiftEmployeeListCtrl', ShiftEmployeeListCtrl);

function ShiftEmployeeListCtrl($scope, $log, commonUtils, employeeRepository, shiftEditorService) {
    var vm = this;
    vm.gridOptions = {
        data: []
    };

    vm.gridOptions.onRegisterApi = function (gridApi) {
        vm.gridApi = gridApi;
        vm.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            shiftEditorService.addEmployee(row.entity);
        });
    };


    vm.gridOptions.columnDefs = [
        {
            field: "name",
            displayName: "Имя",
            enableColumnMenu: false
        },
        {
            field: "lastName",
            displayName: "Фамилия",
            enableColumnMenu: false
        }
    ];

    shiftEditorService.listeners.shift.push(shiftChanged);

    initData();

    function shiftChanged(shift) {
        commonUtils.selectEntityRows(shift.employees, vm.gridOptions, vm.gridApi);
    }

    function initData() {
        employeeRepository.getAll().success(function (data) {
            vm.gridOptions.data = data._embedded.employee;
        }).error(function (data) {
            $log.log(data);
        });
    }
}
