'use strict';

angular.module('app.shift').controller('shiftWorkListCtrl', ShiftWorkListCtrl);

function ShiftWorkListCtrl(workRepository) {
    var vm = this;
    vm.gridOptions = {
        data: []
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


    initData();

    function initData() {
        workRepository.getAll().success(function (data) {
            vm.gridOptions.data = data._embedded.work;
        }).error(function (data) {
            $log.log(data);
        });
    }

}

