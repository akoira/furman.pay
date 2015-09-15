'use strict';

angular.module('app.employee', ['ui.layout', 'ui.grid', "ui.grid.selection"])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/employee', {
            templateUrl: 'app/employee/employee.html',
            controller: 'EmployeeCtrl'
        });
    }])

    .controller('EmployeeCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
        $scope.gridOptions = {};

        $scope.gridOptions.onRegisterApi = function(gridApi) {
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
                $timeout(function() {
                    angular.forEach($scope.user.services, function(id){
                        var values = jQuery.grep($scope.gridOptions.data,
                            function(e){
                                return e.id == id;
                            });
                        if (values.length > 0) {
                            $scope.gridApi.selection.selectRow(values[0]);
                        }
                    })
                });
            });

        $scope.user = {
            firstName: "Andrey",
            lastName: "Koyro",
            services: [
                "cutting",
                "directGlueing",
                "patch"
            ]
        }

    }]);