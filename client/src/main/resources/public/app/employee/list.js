'use strict';

angular.module('app.employee.list', ['ui.grid', "ui.grid.selection", 'app.service.employee'])

    .controller('EmployeeListController', ['$scope', '$http', '$timeout', '$location', 'EmployeeService',
        function ($scope, $http, $timeout, $location, EmployeeService) {
            var employeeList = this;
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

                });
            };

            $http.get('app/data/employee.list.columns.json')
                .success(function (data) {
                    $scope.gridOptions.columnDefs = data;
                });

            EmployeeService.getAll().success(function (data) {
                $scope.gridOptions.data = data._embedded.employee;
            }).error(function (data) {

            });
        }]);