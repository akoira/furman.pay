'use strict';

angular.module('app.shift').controller('shiftValuesCtrl', ShiftValuesCtrl);

function ShiftValuesCtrl($filter, uiGridConstants, commonUtils, shiftEditorService, dayService) {
    var vm = this;
    vm.gridOptions = {
        data: [],
        columnDefs: []
    };

    vm.gridOptions.onRegisterApi = function (gridApi) {
        vm.gridApi = gridApi;
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
            field: work.type + ".value",
            displayName: work.name + ' (смена)',
            enableCellEdit: true,
            enableColumnMenu: false,
            enableSorting: false,
            width: 150,
            work: work
        })

    });


    shiftEditorService.listeners.shift.push(shiftChanged);
    shiftEditorService.listeners.orderAdded.push(addOrder);
    shiftEditorService.listeners.orderRemoved.push(removeOrder);

    shiftEditorService.listeners.workAdded.push(addWork);
    shiftEditorService.listeners.workRemoved.push(removeWork);


    function removeOrder(shift, order) {
        commonUtils.removeFromArrayByFilter(vm.gridOptions.data, {order: {id: order.id}});
    }

    function addOrder(shift, order) {
        var row = {
            order: order
        };
        angular.forEach(shift.works, function (work) {
            addRowValues(row, shift, work);
        });
        vm.gridOptions.data.push(row);

    }

    function addRowValues(row, shift, work) {
        var orderValue = $filter('filter')(row.order.orderValues, {work: {id: work.id}})[0];
        row["order_" + work.type] = orderValue;
        var shiftValue = $filter('filter')(shift.values, {work: {id: work.id}, order: {id: row.order.id}})[0];
        row[work.type] = shiftValue;
    }

    function addWork(shift, work) {
        vm.gridOptions.data.forEach(function (row) {
            addRowValues(row, shift, work);
        });
        var founds = $filter('filter')(vm.gridOptions.columnDefs, {work: {id: work.id}});
        founds.forEach(function (columnDef) {
            columnDef.visible = true;
        });
        vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    }

    function removeWork(shift, work) {
        vm.gridOptions.data.forEach(function (row) {
            row[work.type] = null;
            row["order_" + work.type] = null;
        });

        var founds = $filter('filter')(vm.gridOptions.columnDefs, {work: {id: work.id}});
        founds.forEach(function (columnDef) {
            columnDef.visible = false;
        });
        vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    }


    function shiftChanged(shift) {
        vm.gridOptions.data.splice(0, vm.gridOptions.data.length);
        vm.gridOptions.columnDefs.forEach(function (columnDef) {
            if (columnDef.name != 'order') {
                var founds = $filter('filter')(shift.works, {id: columnDef.work.id})
                columnDef.visible = (founds.length > 0);
            }
        });


        angular.forEach(shift.orders, function (order) {
            addOrder(shift, order);
        })
    }

}
