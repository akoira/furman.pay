'use strict';

angular.module('app.day').controller('dayEditCtrl', DayEditCtrl);

function DayEditCtrl($scope, $http, $log, $filter, dayService, shiftRepository, currentDayService) {
    var vm = this;
    vm.day = currentDayService.day;
    vm.dayDate = currentDayService.getDate();
    vm.save = save;

    vm.registerRowSelection = dayService.registerRowSelection;


    initShiftGrid();


    function rowSelectionChanged(row) {
        if (row.isSelected) {
            vm.day.shifts.push(row.entity);
        } else {
            var index = vm.day.shifts.indexOf(row.entity);
            vm.day.shifts.splice(index, 1);
        }
    }

    function initShiftGrid() {
        vm.gridOptionsS = {
            data: []
        };
        $http.get('app/day/shift.columns.json')
            .success(function (data) {
                vm.gridOptionsS.columnDefs = data;
            });


        vm.gridOptionsS.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            vm.registerRowSelection($scope, gridApi, rowSelectionChanged);
        };

        var initEmployees = function () {
            angular.forEach(vm.gridOptionsS.data, function (shift) {
                shiftRepository.getEmployees(shift).success(function (data) {
                    shift.employees = "";
                    angular.forEach(data._embedded.employee, function (employee) {
                        shift.employees = shift.employees + employee.firstName + " " + employee.lastName + ",";
                    });
                });
            })
        };
        shiftRepository.getAll().then(function (data) {
            vm.gridOptionsS.data = data.data._embedded.shift;
            initEmployees(data);
        });
    }

    function save() {
        dayService.save(vm.day);
    };
}


