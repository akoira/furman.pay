'use strict';

angular.module('app.dashboard', [])
    .controller('dashboardCtrl', DashboardCtrl);

function DashboardCtrl($scope, currentDayService) {
    var vm = this;
    currentDayService.addListener(function (day) {
        vm.currentDate = currentDayService.getDate();
    });
}
