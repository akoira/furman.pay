'use strict';

angular.module('app.day').controller('coreOrdersCtrl', CoreOrdersCtrl);

function CoreOrdersCtrl($scope, $http, $filter, $timeout, $log, dayService, currentDayService) {
    var vm = this;
    vm.day = currentDayService.day;
    vm.dayDate = currentDayService.getDate();
    vm.registerRowSelection = dayService.registerRowSelection;
    vm.moment = momentFrom;
    vm.isCollapsed = true;

    initOrderDate();

    initOrderGrid();

    function momentFrom(localDate) {
        return moment(new Date(localDate[0], localDate[1] - 1, localDate[2]));
    }

    function initOrderDate() {
        vm.orderDate = {
            date: vm.dayDate,
            opened: false,
            format: 'dd-MM-yyyy',
            open: function ($event) {
                vm.orderDate.opened = true;
            },
            disabled: function (date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            },
            getDayClass: function (date, mode) {
                return $filter('filter')(vm.orderDate.orderCountsPerDay, {date: moment(date).format("YYYY-MM-DD")}).length ? "has-orders" : "";
            },
            options: {
                formatYear: 'yy',
                startingDay: 1
            }
        };

        dayService.getOrderCountsPerDay().success(function (data) {
            vm.orderDate.orderCountsPerDay = data;
        }).error(function (data) {
            $log.log(data);
        });

        vm.dateChanged = function () {
            loadData();
        };
    }

    function initOrderGrid() {
        vm.gridOptions = {
            data: [],
            appScopeProvider: vm
        };

        vm.gridOptions.columnDefs = [
            {
                field: "orderNumber",
                displayName: "Номер",
                enableColumnMenu: false,
                cellTemplate: "<div class='truncate'>{{('0'+row.entity.createdDailySheet.date[1]).slice(-2)}}-{{row.entity.orderNumber}}/{{row.entity.name}}</div>",
                width: "40%"
            },
            {
                field: "createdDailySheet.date",
                displayName: "Дата соз-я",
                enableColumnMenu: false,
                cellTemplate: "<div>{{grid.appScope.moment(row.entity.createdDailySheet.date).toDate() | date:'yyyy-MM-dd'}}</div>",
                width: "20%"
            },
            {
                field: "createdDailySheet.date",
                displayName: "Дата пр-ва",
                enableColumnMenu: false,
                cellTemplate: "<div>{{grid.appScope.moment(row.entity.workedDailySheet.date).toDate() | date:'yyyy-MM-dd'}}</div>",
                width: "20%"
            },
            {
                field: "readyDate",
                displayName: "Дата г-ти",
                enableColumnMenu: false,
                cellTemplate: "<div>{{grid.appScope.moment(row.entity.readyDate).toDate() | date:'yyyy-MM-dd'}}</div>",
                width: "20%"
            }
        ];

        loadData();

        vm.gridOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            vm.registerRowSelection($scope, gridApi, rowSelectionChanged);
        };
    }

    function removeDayOrder(row) {
        var dayOrder = getDayOrderBy(row.entity.id);
        if (dayOrder) {
            vm.day.orders.splice(vm.day.orders.indexOf(dayOrder), 1);
        }
    }

    function rowSelectionChanged(row) {
        if (row.isSelected) {
            dayService.getOrNewPayOrder(row.entity).success(function (order) {
                addDayOrder(order);
            });
        } else {
            removeDayOrder(row);
        }
    }

    function addDayOrder(payOrder) {
        var dayOrder = getDayOrderBy(payOrder.orderId);
        if (!dayOrder) {
            dayService.dayOrderService.createDayOrder(vm.day, payOrder).then(function (dayOrder) {
                dayService.dayOrders.push(dayOrder);
            });
        }
    }

    function getDayOrderBy(coreOrderId) {
        var found = $filter('filter')(dayService.dayOrders, {order: {orderId: coreOrderId}});
        return found.length > 0 ? found[0] : null;
    };

    function loadData() {
        dayService.getOrders(vm.orderDate.date).success(function (data) {
            vm.gridOptions.data = data;
            $timeout(function () {
                angular.forEach(vm.gridOptions.data, function (order) {
                    var dayOrder = getDayOrderBy(order.id);
                    if (dayOrder) {
                        vm.gridApi.selection.selectRow(order);
                    }
                });
            });
        }).error(function (data) {
            $log.log(data);
        });
    }
}
