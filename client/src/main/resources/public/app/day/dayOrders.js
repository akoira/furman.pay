'use strict';

angular.module('app.day').controller('DayOrdersCtrl', DayOrdersCtrl);

function DayOrdersCtrl($scope, $http, $log, CurrentDay) {
    var vm = this;

    vm.gridOptions = {
        data: []
    };

    $http.get('app/day/dayOrders.columns.json')
        .success(function (data) {
            vm.gridOptions.columnDefs = data;
        });

    vm.gridOptions.data = CurrentDay.day.orders;
}
