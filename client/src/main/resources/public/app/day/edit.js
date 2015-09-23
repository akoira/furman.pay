'use strict';

angular.module('app.day.edit', ['ui.grid'])
    .controller('DayEditController', DayEditController);

DayEditController.$inject = ['$http'];

function DayEditController($http) {
    var vm = this;

    vm.value = {
        day: new Date()
    };

    vm.gridOptionsO = {
        data: []
    };
    vm.gridOptionsS = {
        data: []
    };
};


//angular.module('app.day.edit', ['ui.grid'])
//    .controller('DayEditController', DayEditController);