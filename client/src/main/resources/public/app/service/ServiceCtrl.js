'use strict';

angular.module('app.rate').controller('serviceCtrl', ServiceCtrl);

function ServiceCtrl($scope, $http, $filter, $timeout, $log, serviceRepository) {
    var vm = this;

    vm.gridOptions = {
        appScopeProvider: vm
    };

    serviceRepository.getAll().success(function (data) {
        vm.gridOptions.data = data._embedded.service;
    });

    vm.gridOptions.columnDefs = [
        {
            field: "name",
            displayName: "Услуга",
            enableColumnMenu: false,
            enableSorting: false
        },
        {
            field: "unit",
            displayName: "Единица изм.",
            enableColumnMenu: false,
            enableSorting: false
        },
        {
            field: "rate",
            displayName: "Зарплата",
            enableColumnMenu: false,
            enableSorting: false,
            enableCellEdit: true,
            type: "number"
        }
    ];
}