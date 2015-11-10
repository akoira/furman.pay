'use strict';


angular.module('app.shift').controller('dayShiftsCtrl', DayShiftsCtrl);

angular.module('app.shift').directive('shiftItem', ShiftItemDirective);

function DayShiftsCtrl($scope, $log, $timeout,
                       dayShiftRepository,
                       dayEditorService,
                       shiftEditorService) {
    var vm = this;
    vm.dayDate = dayEditorService.getDate();
    vm.dayEditorService = dayEditorService;
    vm.isActive = isActive;
    vm.select = shiftEditorService.setShift;
    vm.remove = remove;

    function isActive(shift) {
        return (shiftEditorService.shift && shiftEditorService.shift.id == shift.id);
    }

    function remove(shift) {
        dayEditorService.dayShifts.splice(dayEditorService.dayShifts.indexOf(shift), 1);
        dayShiftRepository.remove({
            id: shift.id
        });
        shiftEditorService.setShift(null);
    }

    //angular.element(document).ready(function () {
    //});


    $scope.$on("$destroy", function () {
        shiftEditorService.listeners.clean();
        shiftEditorService.shift = null;
    });

}


function ShiftItemDirective() {
    var directive = {};
    directive.restrict = 'E';
    directive.scope = {
        shift: '=shift',
        active: '=active',
        select: '=select',
        remove: '=remove'
    };
    directive.templateUrl = 'app/shift/ShiftItem.html';
    return directive;
}
