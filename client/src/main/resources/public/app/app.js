'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ui.router',
    'ui.grid', 'ui.grid.edit',
    'ui.layout',
    'app.employee',
    'app.employee.list',
    'app.orders',
    'app.order.assign',
    'app.version'
]).
    config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('employee', {
                url: '/employee',
                views: {
                    'employee': {
                        templateUrl: 'app/employee/employee.html',
                        controller: "EmployeeController"
                    },
                    'employee.list': {
                        templateUrl: 'app/employee/list.html',
                        controller: "EmployeeListController"
                    }
                }
            })
    }]);
