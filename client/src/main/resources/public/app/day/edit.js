'use strict';

angular.module('app.day').controller('dayEditCtrl', DayEditCtrl);

function DayEditCtrl(dayService, dayEditorService) {
    var vm = this;
    vm.day = dayEditorService.day;
    vm.dayDate = dayEditorService.getDate();
    vm.save = save;
    vm.dayOrders = dayEditorService.dayOrders;
    vm.dayShifts = dayEditorService.dayShifts;

    function save() {
        dayService.save(vm.day);
    };
}


