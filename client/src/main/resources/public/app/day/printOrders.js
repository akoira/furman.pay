'use strict';

angular.module('app.day').controller('printOrderCtrl', PrintOrderCtrl);

function PrintOrderCtrl($scope, $modalInstance, day, commonUtils, dayOrderService) {
    var vm = this;
    vm.day = day;
    vm.dayDate = commonUtils.localDate2Date(vm.day.date);
    vm.dayOrders = [];

    dayOrderService.findAllForDay(vm.day).then(function (data) {
        vm.dayOrders = data.data;
    });
}