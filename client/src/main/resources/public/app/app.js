'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', [
    'eehNavigation',
    'pascalprecht.translate',
    'ui.router',
    'ngResource',
    'app.rest',
    'app.dashboard',
    'app.employee.edit',
    'app.employee.list',
    'app.shift.edit',
    'app.shift.list',
    'app.orders',
    'app.order.assign',
    'app.version',
    'app.day',
    'app.home',
    'app.rate'
]).
    config(['eehNavigationProvider',
        '$stateProvider',
        '$urlRouterProvider',
        function (eehNavigationProvider,
                  $stateProvider,
                  $urlRouterProvider) {

            moment.locale('ru', {
                week: {
                    dow: 1 // Monday is the first day of the week
                }
            });

        eehNavigationProvider.iconBaseClass('glyphicon');

            initLeftMenu();

            $urlRouterProvider.otherwise('/');

            initStates();

            function initLeftMenu() {
                eehNavigationProvider
                    .menuItem('leftMenu.home', {
                        text: 'Календарь',
                        iconClass: 'glyphicon-calendar',
                        state: 'dashboard.home'
                    })
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
                    })
                    .menuItem('leftMenu.service', {
                        text: 'Ставки',
                        iconClass: 'fa fa-money fa-2',
                        state: 'dashboard.service'
                    });
            }


            function initStates() {
                $stateProvider
                    .state('dashboard', {
                        abstract: true,
                        templateUrl: "app/dashboard/dashboard.html",
                        controller: 'DashboardController'
                    })
                    .state('dashboard.home', {
                        url: "/",
                        views: {
                            '': {
                                templateUrl: 'app/home/home.html'
                            }
                    }
                    })
                    .state('dashboard.service', {
                        url: "/service",
                        views: {
                            '': {
                                templateUrl: 'app/service/service.html'
                            }
                        }
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
            }

    }]);

angular.module('app.rest', []);
angular.module('app.day', ['ui.grid', 'ui.grid.autoResize', 'ui.bootstrap.datepicker', 'ui.bootstrap.collapse']);
angular.module('app.rate', ['ui.grid', 'ui.grid.autoResize', 'ui.bootstrap.collapse']);
