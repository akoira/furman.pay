'use strict';

angular.module('app.shift').controller('shiftEditCtrl', ShiftEditCtrl);

function ShiftEditCtrl($scope, shiftEditorService) {

    var vm = this;

    vm.dataLoading = false;
    vm.collapsed = false;
    vm.shift = shiftEditorService.shift;

    shiftEditorService.listeners.shift.push(shiftChanged);

    function shiftChanged(shift) {
        vm.shift = shift;
    }

    vm.save = function () {
        vm.dataLoading = true;
        shiftEditorService.save();
        $scope.dataLoading = false;
    };
}
