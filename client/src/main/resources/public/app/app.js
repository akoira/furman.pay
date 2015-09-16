'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ngRoute',
    'ui.grid', 'ui.grid.edit',
    'ui.layout',
    'app.employee',
    'app.employee.list',
    'app.orders',
    'app.order.assign',
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
            .when('/employee.list', {
                controller: 'EmployeeListController',
                templateUrl: 'app/employee/list.html',
                controllerAs: 'employeeList'
            })
            .when('/orders.assign', {
                controller: 'AssignOrdersController',
                templateUrl: 'app/orders/assign/list.html',
                controllerAs: 'assignOrders'
            })



            .otherwise({redirectTo: '/employee'});
    }]);
