'use strict';

angular.module('app.day').controller('DayEditController', DayEditController);

function DayEditController($scope, $http, $log, $filter, DayEditorService, ShiftRepository, CurrentDay) {
    var vm = this;
    vm.registerRowSelection = DayEditorService.registerRowSelection;


    vm.day = CurrentDay.day;
    vm.dayDate = CurrentDay.getDate();

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
            vm.registerRowSelection($scope, gridApi, rowSelectionChanged);
        };

        var initEmployees = function () {
            angular.forEach(vm.gridOptionsS.data, function (shift) {
                ShiftRepository.getEmployees(shift).success(function (data) {
                    shift.employees = "";
                    angular.forEach(data._embedded.employee, function (employee) {
                        shift.employees = shift.employees + employee.firstName + " " + employee.lastName + ",";
                    });
                });
            })
        };
        ShiftRepository.getAll().then(function (data) {
            vm.gridOptionsS.data = data.data._embedded.shift;
            initEmployees(data);
        });
    };

    vm.save = function () {
        DayEditorService.save(vm.day);
    };
    vm.initShiftGrid();
}


