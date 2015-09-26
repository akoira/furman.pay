'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'eehNavigation',
    'pascalprecht.translate',
    'ui.router',
    'ui.grid', 'ui.grid.edit',
    'ui.bootstrap.datepicker',
    'ngResource',
    'app.dashboard',
    'app.employee.edit',
    'app.employee.list',
    'app.shift.edit',
    'app.shift.list',
    'app.orders',
    'app.order.assign',
    'app.version',
    'app.day.edit'
]).
    config(['eehNavigationProvider', '$stateProvider', '$urlRouterProvider', function (eehNavigationProvider, $stateProvider, $urlRouterProvider) {


        eehNavigationProvider.iconBaseClass('glyphicon');

        eehNavigationProvider
            .menuItem('leftMenu.day', {
                text: 'День',
                iconClass: 'glyphicon-tasks',
                state: 'dashboard.day-edit',
                weight: 0
            })
            .menuItem('leftMenu.orders', {
                text: 'Заказы',
                iconClass: 'glyphicon-home',
                state: 'dashboard.shift',
                weight: 0
            })
            .menuItem('leftMenu.shifts', {
                text: 'Смены',
                iconClass: 'glyphicon-home',
                state: 'dashboard.shift',
                weight: 0
            })
            .menuItem('leftMenu.employees', {
                text: 'Работники',
                iconClass: 'glyphicon-star',
                state: 'dashboard.employee'
            });


        $urlRouterProvider.otherwise('/day');


        $stateProvider
            .state('dashboard', {
                abstract: true,
                templateUrl: "app/dashboard/dashboard.html",
                controller: 'DashboardController'
            })
            .state('dashboard.day-edit', {
                url: "/day",
                views: {
                    '': {
                        templateUrl: 'app/day/edit.html',
                    }
                }
            })
            .state('dashboard.employee', {
                url: '/employee',
                views: {
                    '': {
                        templateUrl: 'app/employee/main.html'
                    },
                    'list@dashboard.employee': {
                        templateUrl: 'app/employee/list.html',
                        controller: 'EmployeeListController'
                    },
                    'edit@dashboard.employee': {
                        templateUrl: 'app/employee/edit.html',
                        controller: 'EmployeeEditController'
                    }

                }
            })
            .state('dashboard.shift', {
                url: '/shift',
                views: {
                    '': {
                        templateUrl: 'app/shift/main.html'
                    },
                    'list@dashboard.shift': {
                        templateUrl: 'app/shift/list.html',
                        controller: 'ShiftListController'
                    },
                    'edit@dashboard.shift': {
                        templateUrl: 'app/shift/edit.html',
                        controller: 'ShiftEditController'
                    }

                }
            })

    }]);
