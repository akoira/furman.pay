'use strict';

angular.module('app.day').controller('DayOrdersCtrl', DayOrdersCtrl);

function DayOrdersCtrl($scope, $http, $log, $filter, CurrentDay) {
    var vm = this;

    initGridOptions();

    vm.gridOptions.data = CurrentDay.day.orders;

    function initGridOptions() {
        vm.gridOptions = {
            data: [],
            appScopeProvider: vm
        };
        $http.get('app/day/dayOrders.columns.json')
            .success(function (data) {
                vm.gridOptions.columnDefs = data;
            });

        vm.gridOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
        };
    }
}
