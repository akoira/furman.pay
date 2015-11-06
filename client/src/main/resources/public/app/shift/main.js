'use strict';


angular.module('app.shift').controller('dayShiftsCtrl', DayShiftsCtrl);

angular.module('app.shift').directive('shiftItem', ShiftItemDirective);

function DayShiftsCtrl($log, currentDayService, shiftEditorService) {
    var vm = this;
    vm.dayDate = currentDayService.getDate();
    vm.dayShifts = currentDayService.dayShifts;
    vm.isActive = isActive;
    vm.select = shiftEditorService.setShift;


    function isActive(shift) {
        return (shiftEditorService.shift.id == shift.id);
    }
}


function ShiftItemDirective() {
    var directive = {};
    directive.restrict = 'E';
    directive.scope = {
        shift: '=shift',
        active: '=active',
        select: '=select'
    };
    directive.templateUrl = 'app/shift/ShiftItem.html';
    return directive;
}
