'use strict';

angular.module('app.day').controller('dayEditCtrl', DayEditCtrl);

function DayEditCtrl($modal, dayService, dayEditorService) {
    var vm = this;
    vm.day = dayEditorService.day;
    vm.dayDate = dayEditorService.getDate();
    vm.save = save;
    vm.printOrders = printOrders;
    vm.dayOrders = dayEditorService.dayOrders;
    vm.dayShifts = dayEditorService.dayShifts;

    function save() {
        dayService.save(vm.day);
    }

    function printOrders() {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'app/day/PrintOrders.html',
            controller: 'printOrderCtrl as vm',
            size: 'lg',
            resolve: {
                day: function () {
                    return vm.day;
                }
            }
        });
    }
}


