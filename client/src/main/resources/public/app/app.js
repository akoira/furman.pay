'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ui.router',
    'ui.grid', 'ui.grid.edit',
    'app.employee.edit',
    'app.employee.list',
    'app.shift.edit',
    'app.shift.list',
    'app.orders',
    'app.order.assign',
    'app.version'
]).
    config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/employee');

        $stateProvider
            .state('employee', {
                url: '/employee',
                views: {
                    '': {
                        templateUrl: 'app/employee/main.html'
                    },
                    'list@employee': {
                        templateUrl: 'app/employee/list.html',
                        controller: 'EmployeeListController'
                    },
                    'edit@employee': {
                        templateUrl: 'app/employee/edit.html',
                        controller: 'EmployeeEditController'
                    }

                }
            })
            .state('shift', {
                url: '/shift',
                views: {
                    '': {
                        templateUrl: 'app/shift/main.html'
                    },
                    'list@shift': {
                        templateUrl: 'app/shift/list.html',
                        controller: 'ShiftListController'
                    },
                    'edit@shift': {
                        templateUrl: 'app/shift/edit.html',
                        controller: 'ShiftEditController'
                    }

                }
            })

    }]);
