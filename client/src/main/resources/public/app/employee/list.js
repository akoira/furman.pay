'use strict';

angular.module('app.employee.list', ['ui.grid', "ui.grid.selection", 'app.rest.employee'])

    .controller('EmployeeListController', ['$scope', '$http', '$timeout', '$location', '$log', 'EmployeeRest',
        function ($scope, $http, $timeout, $location, $log, rest) {
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
                    rest.archive(rows[0].entity);
                }
            };


            $http.get('app/data/employee.list.columns.json')
                .success(function (data) {
                    $scope.gridOptions.columnDefs = data;
                });

            rest.getAll().success(function (data) {
                $scope.gridOptions.data = data._embedded.employee;
            }).error(function (data) {
                $log.log(data);
            });
        }]);