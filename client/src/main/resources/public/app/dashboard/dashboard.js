'use strict';

angular.module('app.dashboard', [])
    .controller('dashboardCtrl', DashboardCtrl);

function DashboardCtrl($scope, currentDayService) {
    var vm = this;
    if (currentDayService.day) {
        vm.currentDate = currentDayService.getDate();
    }

    currentDayService.addListener(function (day) {
        vm.currentDate = currentDayService.getDate();
    });
}
