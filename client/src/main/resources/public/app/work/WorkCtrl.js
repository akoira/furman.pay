'use strict';

angular.module('app.work').controller('workCtrl', WorkCtrl);

function WorkCtrl($scope, $http, $filter, $timeout, $log, $interval, workRepository) {
    var vm = this;

    vm.gridOptions = {
        appScopeProvider: vm
    };


    workRepository.getAll().success(function (data) {
        vm.gridOptions.data = data._embedded.work;
    });


    vm.gridOptions.columnDefs = [
        {
            field: "name",
            displayName: "Услуга",
            enableColumnMenu: false,
            enableSorting: false,
            enableCellEdit: false,
            width: '20%'
        },
        {
            field: "unit",
            displayName: "Единица изм.",
            enableColumnMenu: false,
            enableSorting: false,
            enableCellEdit: false,
            width: '10%'
        },
        {
            field: "rate",
            displayName: "Зарплата",
            enableColumnMenu: false,
            enableSorting: false,
            enableCellEdit: true,
            type: "number",
            width: '70%'
        }
    ];

    vm.saveRow = saveRow;

    vm.gridOptions.onRegisterApi = function (gridApi) {
        vm.gridApi = gridApi;
        vm.gridApi.rowEdit.on.saveRow($scope, vm.saveRow);
    };


    function saveRow(rowEntity) {
        vm.gridApi.rowEdit.setSavePromise(rowEntity, workRepository.save(rowEntity));
    }
}