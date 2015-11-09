'use strict';


angular.module('app.shift').controller('dayShiftsCtrl', DayShiftsCtrl);

angular.module('app.shift').directive('shiftItem', ShiftItemDirective);

function DayShiftsCtrl($scope, $log, $timeout,
                       dayShiftRepository,
                       dayEditorService,
                       shiftEditorService) {
    var vm = this;
    vm.dayDate = dayEditorService.getDate();
    vm.dayShifts = dayEditorService.dayShifts;
    vm.isActive = isActive;
    vm.select = shiftEditorService.setShift;
    vm.remove = remove;
    vm.addNew = addNew;

    function addNew() {
        var shift = create();
        shiftEditorService.setShift(shift);
    }

    function initSelected() {
        if (dayEditorService.dayShifts.length > 0) {
            shiftEditorService.setShift(dayEditorService.dayShifts[0]);
        } else {
            shiftEditorService.setShift(create());
        }
    }

    function isActive(shift) {
        return (shiftEditorService.shift && shiftEditorService.shift.id == shift.id);
    }

    function create() {
        return {
            name: "Смена " + (dayEditorService.dayShifts.length + 1),
            day: dayEditorService.day,
            employees: [],
            works: [],
            orders: [],
            values: []
        }
    }

    function remove(shift) {
        dayEditorService.dayShifts.splice(dayEditorService.dayShifts.indexOf(shift), 1);
        initSelected();
        dayShiftRepository.remove({
            id: shift.id
        });
    }

    $scope.$on("$destroy", function () {
        shiftEditorService.listeners.clean();
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
