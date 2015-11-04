'use strict';

angular.module('app.day').controller('DayOrdersCtrl', DayOrdersCtrl);

function DayOrdersCtrl(dayService, currentDayService) {
    var vm = this;
    vm.round = dayService.round;

    initGridOptions();

    vm.gridOptions.data = currentDayService.dayOrders;

    function initGridOptions() {
        vm.gridOptions = {
            data: [],
            appScopeProvider: vm,
            minRowsToShow: 20,
            showGridFooter: true,
            showColumnFooter: true
        };
        vm.gridOptions.columnDefs = [];
        vm.gridOptions.columnDefs.push({
                "field": "order",
                "displayName": "Заказ",
                "enableCellEdit": false,
                "cellTemplate": "<div>{{('0'+row.entity.payOrder.createdDate[1]).slice(-2)}}-{{row.entity.payOrder.number}}/{{row.entity.payOrder.name}}</div>",
                "pinnedLeft": true,
                "enableColumnMenu": false,
                "enableSorting": false,
                "width": 200
            }
        );

        angular.forEach(dayService.works, function (work) {
            vm.gridOptions.columnDefs.push(createColumnDef(work));
        });

        vm.gridOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
        };
    }

    function aggregationType(visibleRows, self) {
        var result = 0;
        angular.forEach(visibleRows, function (row) {
            var value = eval("row.entity." + self.colDef.editModelField);
            result += value;
        });
        result = vm.round(result, 3);
        self.rateValue = vm.round(result * self.colDef.work.rate, 3);
        return result;
    }

    function createColumnDef(work) {
        return {
            name: work.type,
            work: work,
            displayName: work.name + " (" + work.unit + ")",
            editModelField: "orderValues[" + work.index + "].value",
            cellTemplate: "<div>{{grid.appScope.round(row.entity.orderValues[" + work.index + "].value, 3)}}</div>",
            footerCellTemplate: "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div> {{ col.getAggregationText() + ( col.getAggregationValue() CUSTOM_FILTERS )}}</div></div>",
            aggregationType: aggregationType,
            aggregationHideLabel: true,
            enableCellEdit: true,
            type: "number",
            enablePinning: false,
            enableColumnMenu: false,
            enableSorting: false,
            width: 150
        };
    }
}
