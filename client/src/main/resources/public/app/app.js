'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', [
    'eehNavigation',
    'pascalprecht.translate',
    'ui.router',
    'ngResource',
    'app.rest',
    'app.service',
    'app.dashboard',
    'app.employee',
    'app.shift',
    'app.version',
    'app.day',
    'app.home',
    'app.work',
    'app.order'
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
                    .menuItem('leftMenu.shifts', {
                        text: 'Смены',
                        iconClass: 'fa fa-clock-o fa-2',
                        state: 'dashboard.shift',
                        weight: 0
                    })
                    .menuItem('leftMenu.order', {
                        text: 'Заказ',
                        iconClass: 'fa fa-calculator fa-2',
                        state: 'dashboard.order',
                        weight: 0
                    })
                    .menuItem('leftMenu.employees', {
                        text: 'Работники',
                        iconClass: 'fa fa-users fa-2',
                        state: 'dashboard.employee'
                    })
                    .menuItem('leftMenu.work', {
                        text: 'Ставки',
                        iconClass: 'fa fa-money fa-2',
                        state: 'dashboard.work'
                    });
            }


            function initStates() {
                $stateProvider
                    .state('dashboard', {
                        abstract: true,
                        templateUrl: "app/dashboard/dashboard.html"
                        //resolve: {
                        //    init: function (currentDayService, dayService) {
                        //        //dayService.getOrNewDay(new Date()).success(function (day) {
                        //        //    currentDayService.changeDay(day);
                        //        //});
                        //    }
                        //}
                    })
                    .state('dashboard.home', {
                        url: "/",
                        views: {
                            '': {
                                templateUrl: 'app/home/home.html'
                            }
                        }
                    })
                    .state('dashboard.work', {
                        url: "/work",
                        views: {
                            '': {
                                templateUrl: 'app/work/work.html'
                            }
                        }
                    })
                    .state('dashboard.day-edit', {
                        url: "/day",
                        views: {
                            '': {
                                templateUrl: 'app/day/edit.html'
                            }
                        }
                    })
                    .state('dashboard.order', {
                        url: '/order',
                        views: {
                            '': {
                                templateUrl: 'app/order/main.html'
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
                                templateUrl: 'app/employee/list.html'
                            },
                            'edit@dashboard.employee': {
                                templateUrl: 'app/employee/edit.html'
                            }

                        }
                    })
                    .state('dashboard.shift', {
                        url: '/shift',
                        views: {
                            '': {
                                templateUrl: 'app/shift/main.html'
                            },
                            //'list@dashboard.shift': {
                            //    templateUrl: 'app/shift/list.html',
                            //},
                            //'edit@dashboard.shift': {
                            //    templateUrl: 'app/shift/editor/main.html'
                            //}
                        }
                    })
            }

        }]);


angular.module('app.rest', ['ngResource']);
angular.module('app.service', []);
angular.module('app.day', ['ui.grid',
    'ui.grid.autoResize',
    'ui.grid.pinning',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.cellNav',
    'ui.bootstrap.datepicker',
    'ui.bootstrap.collapse',
    'ui.bootstrap.modal']);
angular.module('app.work', ['ui.grid',
    'ui.grid.autoResize',
    'ui.grid.pinning',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.cellNav', 'ui.bootstrap.collapse']);
angular.module('app.employee', ['ui.grid', "ui.grid.selection", "ui.grid.pagination", 'ui.bootstrap.collapse']);
angular.module('app.shift', ['ui.grid',
    'ui.grid.autoResize',
    'ui.grid.pinning',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.cellNav', 'ui.bootstrap.collapse', 'blockUI']);
angular.module('app.order', ['ui.grid',
    'ui.grid.autoResize',
    'ui.grid.pinning',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.cellNav',
    'ui.bootstrap.collapse',
    'ui.bootstrap.dropdown', 'blockUI']);

angular.module('app.shift').config(function (blockUIConfig) {
    blockUIConfig.message = '...';
});


app.run(function (dayEditorService, dayService) {
    dayService.getOrNewDay(new Date()).success(function (day) {
        dayEditorService.changeDay(day);
    });
});