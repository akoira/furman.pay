'use strict';

angular.module('app.employee.edit', ['ui.grid', "ui.grid.selection"]).controller('EmployeeEditController', EmployeeEditController);

function EmployeeEditController($scope, $http, $log, EmployeeRepository) {
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
            EmployeeRepository.save($scope.value);
        } else {
            EmployeeRepository.create($scope.value);
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
}
