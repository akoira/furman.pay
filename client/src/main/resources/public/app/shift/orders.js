'use strict';

angular.module('app.shift').controller('shiftOrderListCtrl', ShiftOrderListCtrl);

function ShiftOrderListCtrl(currentDayService) {
    var vm = this;
    vm.gridOptions = {
        data: []
    };
    vm.gridOptions.columnDefs = [
        {
            "field": "order",
            "displayName": "Заказ",
            "enableCellEdit": false,
            "cellTemplate": "<div>{{('0'+row.entity.order.createdDate[1]).slice(-2)}}-{{row.entity.order.number}}/{{row.entity.order.name}}</div>",
            "enableColumnMenu": false
        }
    ];
    vm.gridOptions.data = currentDayService.day.orders;
}

