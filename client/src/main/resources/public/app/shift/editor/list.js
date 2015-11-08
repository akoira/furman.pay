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
            name: work.type,
            displayName: work.name + ' (смена)',
            enableCellEdit: true,
            enableColumnMenu: false,
            enableSorting: false,
            width: 150,
            work: work
        })

    });


    shiftEditorService.listeners.shift.push(shiftChanged);

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
                row["order_" + work.type] = $filter('filter')(order.orderValues, {
                    work: {
                        id: work.id
                    }
                })[0];
            });
            angular.forEach(shift.works, function (work) {
                row[work.type] = work;
            });
            vm.gridOptions.data.push(row);
        })
    }

}
