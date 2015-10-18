'use strict';

angular.module('app.order.assign', ['ui.grid']).controller('AssignOrdersController', AssignOrdersController);

function AssignOrdersController($scope, $http, OrderRepository) {

    function initOrdersGrid() {
        $scope.gridOptions = {};
        $http.get('/app/orders/assign/config/columns.json')
            .success(function (data) {
                $scope.gridOptions.columnDefs = data;
            });
        $scope.gridOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
        };

        OrderRepository.getAll().success(function (data) {
            $scope.gridOptions.data = data._embedded.order;
        }).error(function (data) {

        });
    }

    initOrdersGrid();
}
