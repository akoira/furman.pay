'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ngRoute',
    'ui.grid', 'ui.grid.edit',
    'ui.layout',
    'app.employee',
    'app.orders',
    'app.version'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'OrdersController',
                templateUrl: 'app/orders/orders.html',
                controllerAs: 'orders'
            })
            .when('/employee', {
                controller: 'EmployeeController',
                templateUrl: 'app/employee/employee.html',
                controllerAs: 'employee'
            })

            .otherwise({redirectTo: '/employee'});
    }]);
