'use strict';

angular.module('app.shift').controller('shiftOrderListCtrl', ShiftOrderListCtrl);

function ShiftOrderListCtrl($scope, commonUtils, dayEditorService, shiftEditorService) {
    var vm = this;

    vm.sendEvents = true;
    vm.getStatusClass = getStatusClass;

    vm.gridOptions = {
        data: [],
        appScopeProvider: vm
    };

    vm.gridOptions.onRegisterApi = function (gridApi) {
        vm.gridApi = gridApi;
        vm.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            if (vm.sendEvents) {
                if (row.isSelected) {
                    shiftEditorService.addOrder(row.entity);
                } else {
                    shiftEditorService.removeOrder(row.entity);
                }
            }
        });
    };

    vm.gridOptions.columnDefs = [
        {
            "field": "order",
            "displayName": "Заказ",
            "enableCellEdit": false,
            "cellTemplate": "app/day/POrderNumberCell.html",
            "enableColumnMenu": false
        }
    ];
    vm.gridOptions.data = dayEditorService.dayOrders;

    shiftEditorService.listeners.shift.push(shiftChanged);

    function shiftChanged(shift) {
        vm.sendEvents = false;
        commonUtils.selectEntityRows(shift ? shift.orders : [], vm.gridOptions, vm.gridApi);
        vm.sendEvents = true;
    }

    function getStatusClass(status) {
        return status == "design" ? "order-status-design" : "order-status-production";
    }
}

