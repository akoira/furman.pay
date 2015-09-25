'use strict';

angular.module('app.day.edit', ['ui.grid', 'ui.bootstrap.datepicker'])
    .controller('DayEditController', DayEditController);

//DayEditController.$inject = ['$http', '$log', 'DayEditorService'];

function DayEditController($http, $log, $filter, DayEditorService) {
    var vm = this;

    vm.orderDate = {
        date: moment("2014-02-19").toDate(),
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

    vm.value = {
        day: new Date()
    };

    vm.gridOptionsS = {
        data: []
    };

    vm.initOrderGrid = function () {
        vm.gridOptionsO = {
            data: []
        };

        $http.get('app/day/order.columns.json')
            .success(function (data) {
                vm.gridOptionsO.columnDefs = data;
            });


        DayEditorService.getOrders(vm.orderDate.date).success(function (data) {
            vm.gridOptionsO.data = data;
        }).error(function (data) {
            $log.log(data);
        });
    };

    vm.dateChanged = function () {
        DayEditorService.getOrders(vm.orderDate.date).success(function (data) {
            vm.gridOptionsO.data = data;
        }).error(function (data) {
            $log.log(data);
        });
    };

    vm.initOrderGrid();
};

