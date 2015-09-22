'use strict';

angular.module('app.dashboard', [])
    .controller('DashboardController', ['$scope', '$http', '$timeout', '$location', '$log',
        function ($scope, $http, $timeout, $location, $log) {
            $scope.currentDate = moment().startOf('day');
        }]);
