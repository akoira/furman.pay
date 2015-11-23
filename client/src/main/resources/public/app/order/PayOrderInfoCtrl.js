'use strict';


angular.module('app.order').controller('payOrderInfoCtrl', PayOrderInfoCtrl);

function PayOrderInfoCtrl($filter, $log, commonUtils, dayService, dayEditorService, payOrderInfoService) {
    var vm = this;
    vm.service = payOrderInfoService;
    vm.dayEditorService = dayEditorService;
    vm.round = commonUtils.round;
    vm.localDate2Date = commonUtils.localDate2Date;

    vm.isopen = false;
    vm.gridOptions = {
        data: [],
        columnDefs: [{
            field: "day.date",
            displayName: "Дата",
            cellTemplate: "<div class=\"ui-grid-cell-contents\" title=\"TOOLTIP\"><a href='/#/day' ng-click='grid.appScope.changeDay()'>{{COL_FIELD ? (grid.appScope.localDate2Date(COL_FIELD)|date:'yyyy-MM-dd'):'' CUSTOM_FILTERS}}</a></div>",
            enableCellEdit: false,
            enableColumnMenu: false,
            enableSorting: false,
            pinnedLeft: true,
            width: 150,
            cellClass: getCellClass
        }, {
            field: "shift.name",
            displayName: "Смена",
            cellTemplate: "<div class=\"ui-grid-cell-contents\" title=\"TOOLTIP\">{{COL_FIELD ? COL_FIELD:'' CUSTOM_FILTERS}}</div>",
            enableCellEdit: false,
            enableColumnMenu: false,
            enableSorting: false,
            pinnedLeft: true,
            width: 150
        }
        ],
        appScopeProvider: vm
    };

    dayService.works.forEach(function (work) {
        vm.gridOptions.columnDefs.push({
            name: work.type,
            field: work.type + ".value",
            displayName: work.name,
            cellTemplate: "<div class=\"ui-grid-cell-contents\" title=\"TOOLTIP\">{{grid.appScope.round((COL_FIELD ? COL_FIELD: 0.0), 3) CUSTOM_FILTERS}}</div>",
            enableCellEdit: false,
            enableColumnMenu: false,
            enableSorting: false,
            enablePinning: false,
            type: "number",
            width: 150,
            work: work
        })
    });


    if (vm.service.payOrderInfo) {
        updateData(vm.service.payOrderInfo);
    }

    vm.service.addListener(updateData);

    function updateData(payOrderInfo) {
        vm.gridOptions.data.splice(0, vm.gridOptions.data.length);
        var row = {
            type: 'payOrder',
            day: null
        };
        payOrderInfo.payOrder.workValues.forEach(function (workValue) {
            row[workValue.work.type] = workValue;
        });
        vm.gridOptions.data.push(row);

        payOrderInfo.dayOrders.forEach(function (dayOrder) {
            var row = {
                type: 'dayOrder',
                day: dayOrder.day
            };
            dayOrder.orderValues.forEach(function (orderValue) {
                row[orderValue.work.type] = orderValue;
            });
            vm.gridOptions.data.push(row);

            var founds = $filter('filter')(payOrderInfo.dayShifts, {
                orders: {
                    id: dayOrder.id
                }
            });
            founds.forEach(function (shift) {
                var row = {
                    day: dayOrder.day,
                    type: 'dayShift',
                    shift: shift
                };

                var founds = $filter('filter')(shift.values, {
                    order: {
                        id: dayOrder.id
                    }
                });
                founds.forEach(function (shiftValue) {
                    row[shiftValue.work.type] = shiftValue;
                });
                vm.gridOptions.data.push(row);
            });

        });
    }

    function getCellClass(grid, row, col, rowRenderIndex, colRenderIndex) {
        if (row.entity.type) {
            switch (row.entity.type) {
                case 'payOder':
                    return 'cell-payOrder';
                case 'dayOrder':
                    return 'cell-dayOrder';
                case 'dayShift':
                    return 'cell-dayShift';
            }
        }
        return '';
    }
}
