'use strict';

angular.module('app.employee.list', ['ui.grid', "ui.grid.selection"]).controller('EmployeeListController', EmployeeListController);

function EmployeeListController($scope, $http, $log, EmployeeRepository) {
    $scope.gridOptions = {
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        modifierKeysToMultiSelect: false,
        noUnselect: true
    };

    $scope.gridOptions.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            $scope.$parent.$broadcast('employeeSelected', row.entity);
        });
    };

    $scope.delete = function () {
        var rows = $scope.gridApi.selection.getSelectedRows();
        if (rows.length) {
            EmployeeRepository.archive(rows[0]);
            var index = $scope.gridOptions.data.indexOf(rows[0]);
            $scope.gridOptions.data.splice(index, 1);
        }
    };

    $http.get('app/employee/list.columns.json')
        .success(function (data) {
            $scope.gridOptions.columnDefs = data;
        });

    EmployeeRepository.getAll().success(function (data) {
        $scope.gridOptions.data = data._embedded.employee;
    }).error(function (data) {
        $log.log(data);
    });

    $scope.$on('employeeAdded', function (event, data) {
        $scope.gridOptions.data.push(data);
    });
}
