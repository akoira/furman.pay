'use strict';

angular.module('app.shift').controller('shiftWorkListCtrl', ShiftWorkListCtrl);

function ShiftWorkListCtrl($scope, commonUtils, workRepository, shiftEditorService) {
    var vm = this;

    vm.gridOptions = {
        data: []
    };

    vm.gridOptions.onRegisterApi = function (gridApi) {
        vm.gridApi = gridApi;
        vm.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            shiftEditorService.addWork(row.entity);
        });
    };


    vm.gridOptions.columnDefs = [
        {
            field: "name",
            displayName: "Услуга",
            enableColumnMenu: false
        },
        {
            field: "unit",
            displayName: "Единица изм.",
            enableColumnMenu: false
        }
    ];

    shiftEditorService.listeners.shift.push(shiftChanged);

    initData();


    function shiftChanged(shift) {
        commonUtils.selectEntityRows(shift.works, vm.gridOptions, vm.gridApi);
    }

    function initData() {
        workRepository.getAll().success(function (data) {
            vm.gridOptions.data = data._embedded.work;
        }).error(function (data) {
            $log.log(data);
        });
    }

}

