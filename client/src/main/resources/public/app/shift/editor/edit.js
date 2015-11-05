'use strict';

angular.module('app.shift').controller('shiftEditCtrl', ShiftEditCtrl);

function ShiftEditCtrl($scope, shiftEditorService) {

    var vm = this;

    vm.dataLoading = false;
    vm.collapsed = false;

    vm.save = function () {
        vm.dataLoading = true;
        shiftEditorService.save();
        $scope.dataLoading = false;
    };

    $scope.$on('shiftSelected', function (event, data) {
        $scope.value = data;
        $scope.gridOptionsS.updateView();
        $scope.gridOptionsE.updateView();
    });
}
