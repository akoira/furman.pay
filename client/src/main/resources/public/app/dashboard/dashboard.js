'use strict';

angular.module('app.dashboard', [])
    .controller('DashboardController', DashboardController);

function DashboardController($scope, currentDayService) {
    var vm = this;
    currentDayService.addListener(function (day) {
        vm.currentDate = currentDayService.getDate();
    });
}
