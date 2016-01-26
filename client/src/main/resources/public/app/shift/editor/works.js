'use strict';

angular.module('app.shift').controller('shiftWorkListCtrl', ShiftWorkListCtrl);

function ShiftWorkListCtrl($scope, commonUtils, workRepository, dayService, shiftEditorService) {
    var vm = this;

    vm.sendEvents = true;

    vm.gridOptions = {
        data: []
    };

    vm.gridOptions.onRegisterApi = function (gridApi) {
        vm.gridApi = gridApi;
        vm.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            if (vm.sendEvents) {
                if (row.isSelected) {
                    shiftEditorService.addWork(row.entity);
                } else {
                    shiftEditorService.removeWork(row.entity);
                }
            }
        });
    };


    vm.gridOptions.columnDefs = [
        {
            field: "name",
            displayName: "Услуга",
            enableColumnMenu: false,
            cellTemplate: "<div class='truncate'>{{row.entity.name}} ({{row.entity.unit}})</div>"
        }
    ];

    shiftEditorService.listeners.shift.push(shiftChanged);

    initData();


    function shiftChanged(shift) {
        vm.sendEvents = false;
        commonUtils.selectEntityRows(shift ? shift.works : [], vm.gridOptions, vm.gridApi);
        vm.sendEvents = true;
    }

    function initData() {
        vm.gridOptions.data = dayService.works;
    }

}

