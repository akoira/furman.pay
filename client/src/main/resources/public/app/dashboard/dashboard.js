'use strict';

angular.module('app.dashboard', [])
    .controller('DashboardController', DashboardController);

function DashboardController($scope, CurrentDay) {
    var vm = this;
    CurrentDay.addListener(function (day) {
        vm.currentDate = CurrentDay.getDate();
    });
}
