'use strict';

angular.module('app.shift').controller('dayShiftsCtrl', DayShiftsCtrl);

function DayShiftsCtrl(currentDayService) {
    var vm = this;
    vm.dayDate = currentDayService.getDate();
    vm.dayShifts = currentDayService.dayShifts;
}