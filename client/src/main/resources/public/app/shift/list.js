'use strict';

angular.module('app.shift.list', ['ui.grid', "ui.grid.selection"]).controller('ShiftListController', ShiftListController);

function ShiftListController($scope, $http, $log, ShiftRepository) {
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
            ShiftRepository.archive(rows[0]);
            var index = $scope.gridOptions.data.indexOf(rows[0]);
            $scope.gridOptions.data.splice(index, 1);
        }
    };

    $http.get('app/shift/list.columns.json')
        .success(function (data) {
            $scope.gridOptions.columnDefs = data;
        });

    ShiftRepository.getAll().success(function (data) {
        $scope.gridOptions.data = data._embedded.shift;
    }).error(function (data) {
        $scope.gridOptions.data = [];
        $log.log(data);
    });
}
