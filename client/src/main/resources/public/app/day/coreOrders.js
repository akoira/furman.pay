'use strict';

angular.module('app.day').controller('CoreOrdersCtrl', CoreOrdersCtrl);

function CoreOrdersCtrl($scope, $http, $filter, $timeout, $log, DayEditorService, CurrentDay) {
    var vm = this;
    vm.day = CurrentDay.day;
    vm.dayDate = CurrentDay.getDate();

    vm.registerRowSelection = DayEditorService.registerRowSelection;
    vm.initOrderDate = function () {
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

        DayEditorService.getOrderCountsPerDay().success(function (data) {
            vm.orderDate.orderCountsPerDay = data;
        }).error(function (data) {
            $log.log(data);
        });

        vm.dateChanged = function () {
            loadData();
        };
    };

    function loadData() {
        DayEditorService.getOrders(vm.orderDate.date).success(function (data) {
            vm.gridOptions.data = data;
            $timeout(function () {
                angular.forEach(vm.gridOptions.data, function (order) {
                    var found = $filter('filter')(CurrentDay.day.orders, {orderId: order.id});
                    if (found.length > 0) {
                        vm.gridApi.selection.selectRow(order);
                    }
                });
            });
        }).error(function (data) {
            $log.log(data);
        });
    }

    vm.initOrderGrid = function () {
        vm.gridOptions = {
            data: []
        };

        $http.get('app/day/coreOrders.columns.json')
            .success(function (data) {
                vm.gridOptions.columnDefs = data;
            });
        loadData();

        var rowSelectionChanged = function (row) {
            if (row.isSelected) {
                DayEditorService.getOrNewDayOrder(row.entity).success(function (order) {
                    var found = $filter('filter')(vm.day.orders, {id: order.id});
                    if (found.length == 0) {
                        vm.day.orders.push(order);
                    }
                });
            } else {
                var index = vm.day.orders.indexOf(row.entity);
                vm.day.orders.splice(index, 1);
            }
        };


        vm.gridOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            vm.registerRowSelection($scope, gridApi, rowSelectionChanged);
        };
    };


    vm.initOrderDate();
    vm.initOrderGrid();
}
