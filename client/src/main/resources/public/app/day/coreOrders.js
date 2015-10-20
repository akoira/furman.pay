'use strict';

angular.module('app.day').controller('CoreOrdersCtrl', CoreOrdersCtrl);

function CoreOrdersCtrl($scope, $http, $filter, $timeout, $log, DayEditorService, CurrentDay) {
    var vm = this;
    vm.day = CurrentDay.day;
    vm.dayDate = CurrentDay.getDate();
    vm.registerRowSelection = DayEditorService.registerRowSelection;
    vm.moment = momentFrom;

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

        DayEditorService.getOrderCountsPerDay().success(function (data) {
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

        $http.get('app/day/coreOrders.columns.json')
            .success(function (data) {
                vm.gridOptions.columnDefs = data;
            });
        loadData();

        vm.gridOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            vm.registerRowSelection($scope, gridApi, rowSelectionChanged);
        };
    }

    function rowSelectionChanged(row) {
        if (row.isSelected) {
            DayEditorService.getOrNewPayOrder(row.entity).success(function (order) {
                var dayOrder = getDayOrderBy(row.entity.id);
                if (!dayOrder) {
                    dayOrder = {
                        order: order,
                        orderValues: []
                    };
                    angular.forEach(order.orderValues, function (value) {
                        var found = $filter('filter')(dayOrder.orderValues, {type: value.type});
                        if (found.length > 0) {
                            found[0].value += value.value;
                        } else {
                            var dayValue = jQuery.extend(true, {}, value);
                            dayOrder.orderValues.push(dayValue);
                        }
                    });
                    vm.day.orders.push(dayOrder);
                }
            });
        } else {
            var dayOrder = getDayOrderBy(row.entity.id);
            if (dayOrder) {
                vm.day.orders.splice(vm.day.orders.indexOf(dayOrder), 1);
            }
        }
    }

    function getDayOrderBy(coreOrderId) {
        var found = $filter('filter')(vm.day.orders, {order: {orderId: coreOrderId}});
        return found.length > 0 ? found[0] : null;
    };

    function loadData() {
        DayEditorService.getOrders(vm.orderDate.date).success(function (data) {
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
