'use strict';

angular.module('app.rate').controller('serviceCtrl', ServiceCtrl);

function ServiceCtrl($scope, $http, $filter, $timeout, $log, DayEditorService) {
    var vm = this;

    vm.gridOptions = {
        data: DayEditorService.services,
        appScopeProvider: vm
    };
}