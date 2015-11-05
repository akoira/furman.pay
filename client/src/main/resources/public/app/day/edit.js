'use strict';

angular.module('app.day').controller('dayEditCtrl', DayEditCtrl);

function DayEditCtrl(dayService, currentDayService) {
    var vm = this;
    vm.day = currentDayService.day;
    vm.dayDate = currentDayService.getDate();
    vm.save = save;

    function save() {
        dayService.save(vm.day);
    };
}


