'use strict';

angular.module('app.shift').controller('shiftEmployeeListCtrl', ShiftEmployeeListCtrl);

function ShiftEmployeeListCtrl(employeeRepository) {
    var vm = this;
    vm.gridOptions = {
        data: []
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

    initData();

    function initData() {
        employeeRepository.getAll().success(function (data) {
            vm.gridOptions.data = data._embedded.employee;
        }).error(function (data) {
            $log.log(data);
        });
    }
}
