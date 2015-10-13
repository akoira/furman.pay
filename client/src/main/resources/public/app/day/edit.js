'use strict';

angular.module('app.day.edit', ['ui.grid', 'ui.bootstrap.datepicker'])
    .controller('DayEditController', DayEditController);

function DayEditController($scope, $http, $log, $filter, $resource, $timeout, DayEditorService, ShiftRest, CurrentDay) {
    var vm = this;
    vm.day = CurrentDay.day;
    vm.dayDate = CurrentDay.getDate();

    vm.registerRowSelection = function (gridApi, rowSelectionChanged) {
        gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            angular.forEach(rows, function (row) {
                rowSelectionChanged(row);
            });
        });
        gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            rowSelectionChanged(row);
        });
    };


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
            DayEditorService.getOrders(vm.orderDate.date).success(function (data) {
                vm.gridOptionsO.data = data;
            }).error(function (data) {
                $log.log(data);
            });
        };
    }

    vm.initShiftGrid = function () {
        vm.gridOptionsS = {
            data: []
        };
        $http.get('app/day/shift.columns.json')
            .success(function (data) {
                vm.gridOptionsS.columnDefs = data;
            });

        var rowSelectionChanged = function (row) {
            if (row.isSelected) {
                vm.day.shifts.push(row.entity);
            } else {
                var index = vm.day.shifts.indexOf(row.entity);
                vm.day.shifts.splice(index, 1);
            }
        };

        vm.gridOptionsS.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            vm.registerRowSelection(gridApi, rowSelectionChanged);
        };

        var initEmployees = function () {
            angular.forEach(vm.gridOptionsS.data, function (shift) {
                ShiftRest.getEmployees(shift).success(function (data) {
                    shift.employees = "";
                    angular.forEach(data._embedded.employee, function (employee) {
                        shift.employees = shift.employees + employee.firstName + " " + employee.lastName + ",";
                    });
                });
            })
        };
        ShiftRest.getAll().then(function (data) {
            vm.gridOptionsS.data = data.data._embedded.shift;
            initEmployees(data);
        });
    };

    vm.initOrderGrid = function () {
        vm.gridOptionsO = {
            data: []
        };

        $http.get('app/day/order.columns.json')
            .success(function (data) {
                vm.gridOptionsO.columnDefs = data;
            });

        var rowSelectionChanged = function (row) {
            if (row.isSelected) {
                vm.day.orders.push(row.entity);
            } else {
                var index = vm.day.shifts.indexOf(row.entity);
                vm.day.orders.splice(index, 1);
            }
        };


        vm.gridOptionsO.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            vm.registerRowSelection(gridApi, rowSelectionChanged);
        };

        DayEditorService.getOrders(vm.orderDate.date).success(function (data) {
            vm.gridOptionsO.data = data;
        }).error(function (data) {
            $log.log(data);
        });
    };

    vm.save = function () {
        var day = DayEditorService.save(vm.day);
    };

    vm.initOrderDate();
    vm.initOrderGrid();
    vm.initShiftGrid();
}


