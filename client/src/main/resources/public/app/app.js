'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ui.grid', 'ui.grid.edit',
    'ui.layout',
    'myApp.employee',
    'myApp.orders',
    'myApp.view2',
    'myApp.version'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/employee'});
    }]);
