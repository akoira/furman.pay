'use strict';

angular.module('app.shift.edit', ['ui.grid', "ui.grid.selection", 'app.rest.shift', 'app.rest.employee'])

    .controller('ShiftEditController', ['$scope', '$http', '$timeout', '$location', '$log', 'ShiftRest', 'EmployeeRest',
        function ($scope, $http, $timeout, $location, $log, rest, employeeRest) {

            $scope.editor = this;
            $scope.dataLoading = false;
            $scope.value = {};

            this.initServices = function () {
                var gridOptions = {};
                var gridApi = {};

                gridOptions.onRegisterApi = function (api) {
                    //set gridApi on scope
                    gridApi = api;
                    gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                        if ($scope.value) {
                            var rows = gridApi.selection.getSelectedRows();
                            $scope.value.services = rows.map(function (row) {
                                return row.id;
                            });
                        }
                    });
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
                    gridApi.selection.clearSelectedRows();
                    if ($scope.value && $scope.value.services) {
                        angular.forEach($scope.value.services, function (id) {
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
                    gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                        if ($scope.value) {
                            var rows = gridApi.selection.getSelectedRows();
                            $scope.value.employees = rows.map(function (row) {
                                var path = row._links.employee.href.split('/');
                                return path[path.length - 2] + "/" + path[path.length - 1];
                            });
                        }
                    });
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
                    gridApi.selection.clearSelectedRows();
                    if ($scope.value && $scope.value._links && $scope.value._links.employees) {
                        $http.get($scope.value._links.employees.href).success(function (data) {
                            var employees = data._embedded.employee;
                            angular.forEach(employees, function (emp) {
                                var values = jQuery.grep(gridOptions.data,
                                    function (e) {
                                        return e.id == emp.id;
                                    });
                                if (values.length > 0) {
                                    gridApi.selection.selectRow(values[0]);
                                }
                            })

                        });
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
                $scope.gridOptionsE.updateView();
            });

        }]);