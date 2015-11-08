'use strict';

angular.module('app.shift').controller('shiftValuesCtrl', ShiftValuesCtrl);

function ShiftValuesCtrl($filter, shiftEditorService, dayService) {
    var vm = this;
    vm.gridOptions = {
        data: [],
        columnDefs: []
    };

    vm.gridOptions.columnDefs.push({
        "name": "order",
        "displayName": "Заказ",
        "enableCellEdit": false,
        "cellTemplate": "<div>{{('0'+row.entity.order.payOrder.createdDate[1]).slice(-2)}}-{{row.entity.order.payOrder.number}}/{{row.entity.order.payOrder.name}}</div>",
        "pinnedLeft": true,
        "enableColumnMenu": false,
        "enableSorting": false,
        "width": 200
    });

    angular.forEach(dayService.works, function (work) {
        vm.gridOptions.columnDefs.push({
            name: "order_" + work.type,
            field: "order_" + work.type + ".value",
            displayName: work.name + ' (заказ)',
            enableCellEdit: true,
            enableColumnMenu: false,
            enableSorting: false,
            width: 150,
            work: work
        })

        vm.gridOptions.columnDefs.push({
            name: work.type + ".value",
            displayName: work.name + ' (смена)',
            enableCellEdit: true,
            enableColumnMenu: false,
            enableSorting: false,
            width: 150,
            work: work
        })

    });


    shiftEditorService.listeners.shift.push(shiftChanged);
    shiftEditorService.listeners.orderAdded.push();
    shiftEditorService.listeners.orderRemoved.push();


    function shiftChanged(shift) {
        vm.gridOptions.data.splice(0, vm.gridOptions.data.length);
        vm.gridOptions.columnDefs.forEach(function (columnDef) {
            if (columnDef.name != 'order') {
                var founds = $filter('filter')(shift.works, {id: columnDef.work.id})
                columnDef.visible = (founds.length > 0);
            }
        });


        angular.forEach(shift.orders, function (order) {
            var row = {
                order: order,
            };
            angular.forEach(shift.works, function (work) {
                var orderValue = $filter('filter')(order.orderValues, {work: {id: work.id}})[0];
                row["order_" + work.type] = $filter('filter')(order.orderValues, {work: {id: work.id}})[0];
                var shiftValue = $filter('filter')(shift.values, {work: {id: work.id}, order: {id: order.id}})[0];
                row[work.type] = shiftValue;
            });
            vm.gridOptions.data.push(row);
        })
    }

}
