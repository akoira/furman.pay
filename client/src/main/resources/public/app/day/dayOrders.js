'use strict';

angular.module('app.day').controller('DayOrdersCtrl', DayOrdersCtrl);

function DayOrdersCtrl($scope, $http, $log, $filter, DayEditorService, CurrentDay) {
    var vm = this;
    vm.round = DayEditorService.round;

    initGridOptions();

    vm.gridOptions.data = CurrentDay.day.orders;

    function initGridOptions() {
        vm.gridOptions = {
            data: [],
            appScopeProvider: vm,
            minRowsToShow: 20
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

    function createColumnDef(service) {
        return {
            "name": service.type,
            "displayName": service.name + " " + service.unit,
            "editModelField": "orderValues[" + service.index + "].value",
            "cellTemplate": "<div>{{grid.appScope.round(row.entity.orderValues[" + service.index + "].value, 3)}}</div>",
            "enableCellEdit": true,
            "type": "number",
            "enablePinning": false,
            "enableColumnMenu": false,
            "enableSorting": false,
            "width": 150
        };
    }
}
