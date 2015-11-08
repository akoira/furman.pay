'use strict';

angular.module('app.day').controller('coreOrdersCtrl', CoreOrdersCtrl);

function CoreOrdersCtrl($scope, $http, $filter, $timeout, $log, commonUtils, dayService, currentDayService) {
    var vm = this;
    var dataLoading = false;
    vm.moment = momentFrom;
    vm.isCollapsed = currentDayService.dayOrders.length > 0;

    initOrderDate();

    initOrderGrid();

    function momentFrom(localDate) {
        return moment(new Date(localDate[0], localDate[1] - 1, localDate[2]));
    }

    function initOrderDate() {
        vm.orderDate = {
            date: currentDayService.getDate(),
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

        dayService.getClosestWorkingDate().then(function (data) {
            vm.orderDate.date = currentDayService.dateOf(data.data);
            loadData();
        });


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

        vm.gridOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            commonUtils.registerRowSelection($scope, gridApi, rowSelectionChanged);
        };
    }

    function rowSelectionChanged(row) {
        if (dataLoading) {
            return;
        }
        if (row.isSelected) {
            dayService.getOrNewPayOrder(row.entity).success(function (order) {
                currentDayService.addPayOrder(order);
            });
        } else {
            currentDayService.removeDayOrder(row);
        }
    }


    function loadData() {
        dataLoading = true;
        dayService.getOrders(vm.orderDate.date).success(function (data) {
            vm.gridOptions.data = data;
            $timeout(function () {
                angular.forEach(vm.gridOptions.data, function (order) {
                    var dayOrder = currentDayService.getDayOrderByCoreOrderId(order.id);
                    if (dayOrder) {
                        vm.gridApi.selection.selectRow(order);
                    }
                });
            });
            dataLoading = false;
        }).error(function (data) {
            $log.log(data);
        });
    }
}
