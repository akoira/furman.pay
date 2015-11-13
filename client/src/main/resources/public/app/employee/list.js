'use strict';

angular.module('app.employee').controller('employeeListCtrl', EmployeeListCtrl);

function EmployeeListCtrl($scope, $timeout, $log, employeeEditorService, employeeRepository) {
    var vm = this;
    vm.remove = remove;

    initGridOptions();
    initData();

    employeeEditorService.addEmployeeAddedListener(function (employee) {
        vm.gridOptions.data.push(employee);
    });

    function initGridOptions() {
        vm.gridOptions = {
            appScopeProvider: vm,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            modifierKeysToMultiSelect: false,
            noUnselect: true,
            minRowsToShow: 15,
            //paginationPageSizes: [20],
            //paginationPageSize: 20,
            //useExternalPagination: true
        };
        vm.gridOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            vm.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                employeeEditorService.employeeSelected(row.entity);
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
            },
            {
                field: "phoneNumber",
                displayName: "Телефон",
                enableColumnMenu: false
            },
            {
                field: "id",
                displayName: "",
                enableColumnMenu: false,
                enableFiltering: false,
                enableSorting: false,
                cellTemplate: "<button class='btn btn-danger btn-sm glyphicon glyphicon-trash row-button' ng-click='grid.appScope.remove()'></button>",
                width: 80,
                maxWidth: 80
            }
        ];
    }

    function remove() {
        var rows = vm.gridApi.selection.getSelectedRows();
        if (rows.length) {
            rows[0].archived = true;
            employeeRepository.archive(rows[0]).$promise.then(function (data) {
                var index = vm.gridOptions.data.indexOf(rows[0]);
                vm.gridOptions.data.splice(index, 1);
            });
        }
    }

    function initData() {
        employeeRepository.getAllVisible().$promise.then(function (data) {
            vm.gridOptions.data = data._embedded.employee;
        }, function (data) {
            $log.log(data);
        });
    }
}
