'use strict';

angular.module('app.day').controller('printOrderCtrl', PrintOrderCtrl);

function PrintOrderCtrl($scope, $modalInstance, day, commonUtils, dayOrderService) {
    var vm = this;
    vm.day = day;
    vm.dayDate = commonUtils.localDate2Date(vm.day.date);
    vm.dayOrders = [];
    vm.localDate2Date = commonUtils.localDate2Date;

    dayOrderService.findAllForDay(vm.day).then(function (data) {
        vm.dayOrders = data.data;
    });
}