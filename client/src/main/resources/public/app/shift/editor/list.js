'use strict';

angular.module('app.shift').controller('shiftValuesCtrl', ShiftValuesCtrl);

function ShiftValuesCtrl() {
    var vm = this;
    vm.gridOptions = {
        data: []
    };
}
