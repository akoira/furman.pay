'use strict';

angular.module('app.service').service('dayService', DayService);

function DayService($http, $filter, dayRepository, workRepository, dayOrderService) {

    var baseUrl = "/api/pay/dayService";
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
    service.getClosestWorkingDate = getClosestWorkingDate;
    service.round = round;
    service.dayOrderService = dayOrderService;
    service.dayOrders = [];

    workRepository.getAll().success(function (data) {
        /** @namespace data._embedded.work */
        /** @namespace data._embedded */
        service.works = data._embedded.work;
    });


    function getClosestWorkingDate() {
        return $http.get(baseUrl + "/getClosestWorkingDate");
    }

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
        dayOrderService.deleteByDay(day);

        angular.forEach(day.orders, function (order) {
            order.order = "/api/pay/payOrder/" + order.order.id;
            angular.forEach(order.orderValues, function (value) {
                value.work = "/api/pay/work/" + value.work.id;
            })
        });
        return dayRepository.save(day);
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