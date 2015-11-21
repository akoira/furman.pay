'use strict';

angular.module('app.shift').controller('shiftValuesCtrl', ShiftValuesCtrl);

function ShiftValuesCtrl($scope, $filter, uiGridConstants, commonUtils, shiftEditorService, dayService) {
    var vm = this;

    vm.round = commonUtils.round;
    vm.getStatusClass = getStatusClass;
    vm.saveRow = saveRow;
    vm.isNew = isNew;

    vm.gridOptions = {
        data: [],
        columnDefs: [],
        appScopeProvider: vm,
        minRowsToShow: 15,
        showGridFooter: true,
        showColumnFooter: true
    };

    vm.gridOptions.onRegisterApi = function (gridApi) {
        vm.gridApi = gridApi;
        vm.gridApi.rowEdit.on.saveRow($scope, vm.saveRow);
    };


    vm.gridOptions.columnDefs.push({
        "name": "order",
        "displayName": "Заказ",
        "enableCellEdit": false,
        "cellTemplate": "app/shift/editor/OrderNumberCell.html",
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
            cellTemplate: "<div class=\"ui-grid-cell-contents\" title=\"TOOLTIP\">{{grid.appScope.round(COL_FIELD, 3) CUSTOM_FILTERS}}</div>",
            //cellTemplate: "<div >{{grid.appScope.round(COL_FIELD) CUSTOM_FILTERS}}</div>",
            //cellTemplate: "<div class=\"ui-grid-cell-contents\" title=\"TOOLTIP\">{{grid.appScope.round(row.entity.order_" + work.type + ".value, 3)}}</div>",
            enableCellEdit: false,
            enableColumnMenu: false,
            enableSorting: false,
            enablePinning: false,
            type: "number",
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
            enablePinning: false,
            type: "number",
            width: 150,
            footerCellTemplate: "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div> {{ col.getAggregationText() + ( col.getAggregationValue() CUSTOM_FILTERS )}}</div></div>",
            aggregationType: aggregationType,
            aggregationHideLabel: true,
            work: work
        })

    });


    shiftEditorService.listeners.shift.push(shiftChanged);
    shiftEditorService.listeners.orderAdded.push(addOrder);
    shiftEditorService.listeners.orderRemoved.push(removeOrder);

    shiftEditorService.listeners.workAdded.push(addWork);
    shiftEditorService.listeners.workRemoved.push(removeWork);


    function isNew() {
        return shiftEditorService.isNew();
    }

    function aggregationType(visibleRows, self) {
        var result = 0;
        angular.forEach(visibleRows, function (row) {
            var value = eval("row.entity." + self.colDef.field);
            result += value;
        });
        result = vm.round(result, 3);
        return result;
    }

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
                var founds = $filter('filter')(shift ? shift.works : [], {id: columnDef.work.id})
                columnDef.visible = (founds.length > 0);
            }
        });

        angular.forEach(shift ? shift.orders : [], function (order) {
            addOrder(shift, order);
        })
    }

    function getStatusClass(status) {
        return status == "design" ? "order-status-design" : "order-status-production";
    }

    function saveRow(rowEntity) {
        vm.gridApi.rowEdit.setSavePromise(rowEntity, shiftEditorService.updateForRow());
    }

}
