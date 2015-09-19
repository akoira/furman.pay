'use strict';

angular.module('app.shift.edit', ['ui.layout', 'ui.grid', "ui.grid.selection", 'app.rest.shift', 'app.rest.employee'])

    .controller('ShiftEditController', ['$scope', '$http', '$timeout', '$location', '$log', 'ShiftRest', 'EmployeeRest',
        function ($scope, $http, $timeout, $location, $log, rest, employeeRest) {

            $scope.editor = this;
            $scope.dataLoading = false;
            $scope.value = null;

            this.initServices = function () {
                var gridOptions = {};
                var gridApi = {};

                gridOptions.onRegisterApi = function (api) {
                    //set gridApi on scope
                    gridApi = api;
                };


                $http.get('app/data/services.columns.json')
                    .success(function (data) {
                        gridOptions.columnDefs = data;
                    });

                $http.get('app/data/services.json')
                    .success(function (data) {
                        gridOptions.data = data;
                    });

                gridOptions.updateView = function () {
                    if ($scope.value) {
                        angular.forEach($scope.value.employees, function (id) {
                            var values = jQuery.grep(gridOptions.data,
                                function (e) {
                                    return e.id == id;
                                });
                            if (values.length > 0) {
                                gridApi.selection.selectRow(values[0]);
                            }
                        })
                    }
                };
                $scope.gridOptionsS = gridOptions;
                $scope.gridApiS = gridApi;
            };
            this.initEmployees = function () {
                var gridOptions = {};
                var gridApi = {};

                gridOptions.onRegisterApi = function (api) {
                    //set gridApi on scope
                    gridApi = api;
                };


                $http.get('app/shift/employee.columns.json')
                    .success(function (data) {
                        gridOptions.columnDefs = data;
                    });

                employeeRest.getAll().success(function (data) {
                    gridOptions.data = data._embedded.employee;
                }).error(function (data) {
                    $log.log(data);
                });

                gridOptions.updateView = function () {
                    if ($scope.value) {
                        angular.forEach($scope.value.employees, function (id) {
                            var values = jQuery.grep(gridOptions.data,
                                function (e) {
                                    return e.id == id;
                                });
                            if (values.length > 0) {
                                gridApi.selection.selectRow(values[0]);
                            }
                        })
                    }
                };
                $scope.gridOptionsE = gridOptions;
                $scope.gridApiE = gridApi;
            };

            this.initServices();
            this.initEmployees();

            $scope.save = function () {
                $scope.dataLoading = true;
                if ($scope.value._links) {
                    rest.save($scope.value);
                } else {
                    rest.create($scope.value);
                }
                $scope.dataLoading = false;
            };

            $scope.$on('shiftSelected', function (event, data) {
                $scope.value = data;
                $scope.gridOptionsS.updateView();
            });

        }]);