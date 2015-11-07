'use strict';

angular.module('app.shift').controller('shiftEditCtrl', ShiftEditCtrl);

function ShiftEditCtrl($scope, shiftEditorService) {

    var vm = this;

    vm.dataLoading = false;
    vm.collapsed = false;
    vm.shift = null;

    shiftEditorService.listeners.shift.push(shiftChanged);

    function shiftChanged(shift) {
        vm.shift = shift;
        vm.collapsed = shift.employees.length > 0 &&
            shift.works.length > 0 &&
            shift.orders.length > 0;
    }

    vm.save = function () {
        vm.dataLoading = true;
        shiftEditorService.save();
        vm.dataLoading = false;
    };
}
