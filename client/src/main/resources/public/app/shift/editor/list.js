'use strict';

angular.module('app.shift').controller('shiftListCtrl', ShiftListCtrl);

function ShiftListCtrl($scope, $http, $log, currentDayService) {
    var vm = this;
    vm.gridOptions = {
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        modifierKeysToMultiSelect: false,
        noUnselect: true,
        data: currentDayService.day.orders
    };

    vm.gridOptions.onRegisterApi = function (gridApi) {
        vm.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            vm.$parent.$broadcast('shiftSelected', row.entity);
        });
    };

    vm.delete = function () {
        var rows = $scope.gridApi.selection.getSelectedRows();
    };
}
