'use strict';

angular.module('app.day').controller('DayOrdersCtrl', DayOrdersCtrl);

function DayOrdersCtrl($scope, $http, $log, $filter, uiGridConstants, DayEditorService, CurrentDay) {
    var vm = this;
    vm.round = DayEditorService.round;

    initGridOptions();

    vm.gridOptions.data = CurrentDay.day.orders;

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
                "cellTemplate": "<div>{{('0'+row.entity.order.createdDate[1]).slice(-2)}}-{{row.entity.order.number}}/{{row.entity.order.name}}</div>",
                "pinnedLeft": true,
                "enableColumnMenu": false,
                "enableSorting": false,
                "width": 200
            }
        );

        angular.forEach(DayEditorService.services, function (service) {
            vm.gridOptions.columnDefs.push(createColumnDef(service));
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
        self.rateValue = vm.round(result * 0.2, 3);
        return result;
    }

    function createColumnDef(service) {
        return {
            name: service.type,
            displayName: service.name + " " + service.unit,
            editModelField: "orderValues[" + service.index + "].value",
            cellTemplate: "<div>{{grid.appScope.round(row.entity.orderValues[" + service.index + "].value, 3)}}</div>",
            footerCellTemplate: "<div class=\"ui-grid-cell-contents\" col-index=\"renderIndex\"><div> {{ col.getAggregationText() + ( col.getAggregationValue() CUSTOM_FILTERS )}}/{{ col.rateValue }}</div></div>",
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
