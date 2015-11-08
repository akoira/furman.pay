'use strict';

angular.module('app.shift').controller('shiftValuesCtrl', ShiftValuesCtrl);

function ShiftValuesCtrl(shiftEditorService, dayService) {
    var vm = this;
    vm.gridOptions = {
        data: [],
        columnDefs: []
    };

    vm.gridOptions.columnDefs.push({
        "field": "order",
        "displayName": "Заказ",
        "enableCellEdit": false,
        "cellTemplate": "<div>{{('0'+row.entity.order.payOrder.createdDate[1]).slice(-2)}}-{{row.entity.order.payOrder.number}}/{{row.entity.order.payOrder.name}}</div>",
        "pinnedLeft": true,
        "enableColumnMenu": false,
        "enableSorting": false,
        "width": 200
    });

    angular.forEach(dayService.works, function (work) {
        //vm.gridOptions.columnDefs.push({
        //
        //})
    });


    shiftEditorService.listeners.shift.push(shiftChanged);

    function shiftChanged(shift) {
        vm.gridOptions.data.splice(0, vm.gridOptions.data.length);


        angular.forEach(shift.orders, function (order) {
            var row = {
                order: order,
            };
            angular.forEach(shift.works, function (work) {
                row[work.type] = work;
            });
            vm.gridOptions.data.push(row);
        })
    }

}
