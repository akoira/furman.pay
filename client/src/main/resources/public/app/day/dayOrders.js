'use strict';

angular.module('app.day').controller('DayOrdersCtrl', DayOrdersCtrl);

function DayOrdersCtrl($scope, $http, $log, $filter, CurrentDay) {
    var vm = this;

    initGridOptions();

    vm.gridOptions.data = CurrentDay.day.orders;
    vm.getOrderValueFor = getOrderValueFor;

    function initGridOptions() {
        vm.gridOptions = {
            data: [],
            appScopeProvider: vm
        };
        $http.get('app/day/dayOrders.columns.json')
            .success(function (data) {
                vm.gridOptions.columnDefs = data;
            });
    }


    function getOrderValueFor(serviceType, dayOrder) {
        var found = $filter('filter')(dayOrder.orderValues, {type: serviceType});
        if (found.length) {
            var result = 0;
            angular.forEach(found, function (value) {
                result += value.value;
            })
        }
        return result ? (Math.round(result * 100) / 100) : 0.0;
    }
}
