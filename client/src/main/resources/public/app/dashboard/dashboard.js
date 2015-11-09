'use strict';

angular.module('app.dashboard', [])
    .controller('dashboardCtrl', DashboardCtrl);

function DashboardCtrl($scope, dayEditorService) {
    var vm = this;
    if (dayEditorService.day) {
        vm.currentDate = dayEditorService.getDate();
    }

    dayEditorService.addListener(function (day) {
        vm.currentDate = dayEditorService.getDate();
    });
}
