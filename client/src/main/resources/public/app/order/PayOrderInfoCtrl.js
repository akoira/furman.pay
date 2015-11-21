'use strict';


angular.module('app.order').controller('payOrderInfoCtrl', PayOrderInfoCtrl);

function PayOrderInfoCtrl(commonUtils, dayService, payOrderInfoService) {
    var vm = this;
    vm.service = payOrderInfoService;
    vm.round = commonUtils.round;
    vm.isopen = false;
    vm.gridOptions = {
        data: [],
        columnDefs: [{
            field: "day.date",
            displayName: "Дата",
            enableCellEdit: false,
            enableColumnMenu: false,
            enableSorting: false,
            pinnedLeft: true,
            width: 150
        }],
        appScopeProvider: vm
    };

    dayService.works.forEach(function (work) {
        vm.gridOptions.columnDefs.push({
            name: work.type,
            field: work.type,
            displayName: work.name,
            cellTemplate: "<div class=\"ui-grid-cell-contents\" title=\"TOOLTIP\">{{grid.appScope.round(COL_FIELD, 3) CUSTOM_FILTERS}}</div>",
            enableCellEdit: false,
            enableColumnMenu: false,
            enableSorting: false,
            enablePinning: false,
            type: "number",
            width: 150,
            work: work
        })
    });


    vm.service.addListener(function (payOrderInfo) {
        vm.gridOptions.data.splice(0, vm.gridOptions.data.length);
        var row = {
            day: null
        };
        payOrderInfo.payOrder.workValues.forEach(function (workValue) {
            row[workValue.work.type] = workValue.value;
        });
        vm.gridOptions.data.push(row);

        payOrderInfo.dayOrders.forEach(function (dayOrder) {
            var row = {
                day: dayOrder.day
            };
            dayOrder.orderValues.forEach(function (orderValue) {
                row[orderValue.work.type] = orderValue.value;
            });
            vm.gridOptions.data.push(row);
        });
    });

}
