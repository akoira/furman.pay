'use strict';

angular.module('app.shift').controller('shiftEditCtrl', ShiftEditCtrl);

function ShiftEditCtrl($scope, shiftEditorService, dayEditorService) {

    var vm = this;

    vm.dataLoading = false;
    vm.collapsed = true;
    vm.shift = null;
    vm.addNew = addNew;
    vm.save = save;

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
