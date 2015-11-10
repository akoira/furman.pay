'use strict';

angular.module('app.shift').controller('shiftEditCtrl', ShiftEditCtrl);

function ShiftEditCtrl($scope, blockUI, shiftEditorService, dayEditorService) {

    var vm = this;

    vm.dataLoading = false;
    vm.collapsed = false;
    vm.shift = null;
    vm.addNew = addNew;
    vm.save = save;
    var blocker = blockUI.instances.get('shift-editor-block');
    blocker.start();

    shiftEditorService.listeners.shift.push(shiftChanged);

    function addNew() {
        var shift = create();
        shiftEditorService.setShift(shift);
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

    function shiftChanged(shift) {
        if (shift) {
            blocker.stop();
        } else {
            blocker.start();
        }
        vm.shift = shift;
        vm.collapsed = shift != null && shift.employees.length > 0 &&
            shift.works.length > 0 &&
            shift.orders.length > 0;
    }

    function save() {
        vm.dataLoading = true;
        shiftEditorService.save();
        vm.dataLoading = false;
    };
}
