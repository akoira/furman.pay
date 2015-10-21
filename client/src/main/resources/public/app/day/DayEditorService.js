'use strict';

angular.module('app.day').service('DayEditorService', DayEditorService);

function DayEditorService($http, $log, DayRepository) {

    var baseUrl = "/api/pay/dayEdit";
    var service = {};

    service.getOrders = getOrders;
    service.getOrderCountsPerDay = getOrderCountsPerDay;
    service.save = save;
    service.getDay = getDay;
    service.getOrNewDay = getOrNewDay;
    service.getDays = getDays;
    service.createNewDay = createNewDay;
    service.getOrNewPayOrder = getOrNewPayOrder;
    service.registerRowSelection = registerRowSelection;
    service.round = round;
    service.services = [
        {
            type: "cutting",
            name: "Распил",
            unit: "м.п.",
            index: 0
        },
        {
            type: "directGlueing",
            name: "Оклейка прямолинейная",
            unit: "м.п.",
            index: 1
        },
        {
            type: "curveGlueing",
            name: "Оклейка криволинейная",
            unit: "м.п.",
            index: 2
        },
        {
            type: "milling",
            name: "Фрезеровка",
            unit: "м.п.",
            index: 3
        },
        {
            type: "drilling",
            name: "Фрезеровка под петли",
            unit: "шт.",
            index: 4
        },
        {
            type: "groove",
            name: "Паз",
            unit: "м.п.",
            index: 5
        },
        {
            type: "angle",
            name: "Угол. распил",
            unit: "м.п.",
            index: 6
        },
        {
            type: "patch",
            name: "Склейка",
            unit: "м.кв.",
            index: 7
        },
        {
            type: "cutoff",
            name: "Срез.",
            unit: "м.п.",
            index: 8
        }
    ];

    function createNewDay(date) {
        return $http.get(baseUrl + "/createNewDay?date=" +
            date.format("YYYY-MM-DD"));
    }

    function getDays(startDate, endDate) {
        return $http.get(baseUrl + "/getDays?startDate=" +
            startDate.format("YYYY-MM-DD") + "&" + "endDate=" + endDate.format("YYYY-MM-DD"));
    }

    function getDay(date) {
        return $http.get(baseUrl + '/getDay?date=' + date.format("YYYY-MM-DD"));
    }

    function getOrders(date) {
        return $http.get(baseUrl + '/getOrders?date=' + moment(date).format("YYYY-MM-DD"));
    }

    function getOrderCountsPerDay() {
        return $http.get(baseUrl + '/getOrderCountsPerDay').then();
    }

    function getOrNewDay(date) {
        return $http.get(baseUrl + '/getOrNewDay?date=' + moment(date).format("YYYY-MM-DD"));
    }

    function save(day) {

        day = jQuery.extend(true, {}, day);

        angular.forEach(day.orders, function (order) {
            order.order = "/api/pay/payOrder/" + order.order.id;
        });
        return DayRepository.save(day);
    }

    function getOrNewPayOrder(order) {
        return $http.get(baseUrl + '/getOrNewPayOrder?orderId=' + order.id);
    }


    // private functions

    function handleSuccess(data) {
        return data;
    }

    function handleError(error) {
        return function () {
            return {success: false, message: error.cause.message};
        };
    }


    function registerRowSelection($scope, gridApi, rowSelectionChanged) {
        gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            angular.forEach(rows, function (row) {
                rowSelectionChanged(row);
            });
        });
        gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            rowSelectionChanged(row);
        });
    }

    function round(value, decimal) {
        var m = Math.pow(10, decimal);
        return Math.round(value * m) / m;
    }

    return service;
}
