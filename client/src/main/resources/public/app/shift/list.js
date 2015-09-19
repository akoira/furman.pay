'use strict';

angular.module('app.shift.list', ['ui.grid', "ui.grid.selection", 'app.rest.shift'])

    .controller('ShiftListController', ['$scope', '$http', '$timeout', '$location', '$log', 'ShiftRest',
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
                    $scope.$parent.$broadcast('shiftSelected', row.entity);
                });
            };

            $scope.delete = function () {
                var rows = $scope.gridApi.selection.getSelectedRows();
                if (rows.length) {
                    rest.archive(rows[0]);
                    var index = $scope.gridOptions.data.indexOf(rows[0]);
                    $scope.gridOptions.data.splice(index, 1);
                }
            };


            $http.get('app/shift/list.columns.json')
                .success(function (data) {
                    $scope.gridOptions.columnDefs = data;
                });

            rest.getAll().success(function (data) {
                $scope.gridOptions.data = data._embedded.shift;
            }).error(function (data) {
                $scope.gridOptions.data = [];
                $log.log(data);
            });
        }]);