'use strict';

angular.module('app.employee.edit', ['ui.layout', 'ui.grid', "ui.grid.selection", 'app.rest.employee'])

    .controller('EmployeeEditController', ['$scope', '$http', '$timeout', '$location', '$log', 'EmployeeRest',
        function ($scope, $http, $timeout, $location, $log, rest) {
            $scope.dataLoading = false;
            $scope.value = null;

            $scope.gridOptions = {};

            $scope.gridOptions.onRegisterApi = function (gridApi) {
                //set gridApi on scope
                $scope.gridApi = gridApi;
            };

            $http.get('app/data/services.columns.json')
                .success(function (data) {
                    $scope.gridOptions.columnDefs = data;
                });

            $http.get('app/data/services.json')
                .success(function (data) {
                    $scope.gridOptions.data = data;
                });

            $scope.save = function () {
                $scope.dataLoading = true;
                if ($scope.value._links) {
                    rest.save($scope.value);
                } else {
                    rest.create($scope.value);
                    $scope.$parent.$broadcast('employeeAdded', $scope.value);
                }
                $scope.dataLoading = false;
            };

            $scope.$on('employeeSelected', function (event, data) {
                $log.debug(event);
                $scope.value = data;
                updateView();
            });

            var updateView = function () {
                if ($scope.value) {
                    angular.forEach($scope.value.services, function (id) {
                        var values = jQuery.grep($scope.gridOptions.data,
                            function (e) {
                                return e.id == id;
                            });
                        if (values.length > 0) {
                            $scope.gridApi.selection.selectRow(values[0]);
                        }
                    })
                }
            };
        }]);