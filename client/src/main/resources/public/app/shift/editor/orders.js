'use strict';

angular.module('app.shift').controller('shiftOrderListCtrl', ShiftOrderListCtrl);

function ShiftOrderListCtrl($scope, currentDayService, shiftEditorService) {
    var vm = this;
    vm.gridOptions = {
        data: []
    };

    vm.gridOptions.onRegisterApi = function (gridApi) {
        vm.gridApi = gridApi;
        vm.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            shiftEditorService.addOrder(row.entity);
        });
    };

    vm.gridOptions.columnDefs = [
        {
            "field": "order",
            "displayName": "Заказ",
            "enableCellEdit": false,
            "cellTemplate": "<div>{{('0'+row.entity.payOrder.createdDate[1]).slice(-2)}}-{{row.entity.payOrder.number}}/{{row.entity.payOrder.name}}</div>",
            "enableColumnMenu": false
        }
    ];
    vm.gridOptions.data = currentDayService.dayOrders;
}

