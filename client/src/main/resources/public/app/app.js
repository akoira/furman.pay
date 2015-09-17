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
    }]);
