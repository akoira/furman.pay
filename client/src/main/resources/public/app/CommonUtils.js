'use strict';

angular.module('app').factory('commonUtils', CommonUtils);

function CommonUtils($timeout, $filter) {
    var factory = this;
    factory.selectEntityRows = selectEntityRows;
    factory.registerRowSelection = registerRowSelection;
    factory.removeFromArrayByFilter = removeFromArrayByFilter;
    factory.round = round;

    function selectEntityRows(entitiesToSelect, gridOptions, gridApi) {
        gridApi.selection.clearSelectedRows();
        angular.forEach(entitiesToSelect, function (entity) {
            var founds = $filter('filter')(gridOptions.data, {id: entity.id});
            if (founds.length > 0) {
                angular.forEach(founds, function (found) {
                    gridApi.selection.selectRow(found);
                })
            } else {
                gridOptions.data.unshift(entity);
                $timeout(function () {
                    gridApi.selection.selectRow(entity);
                }, 100);
            }
        });
    }

    function registerRowSelection($scope, gridApi, rowSelectionChanged) {
        gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            angular.forEach(rows, function (row) {
                rowSelectionChanged(row);
            });
        });
        gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            rowSelectionChanged(row);
        });
    }

    function removeFromArrayByFilter(dataArray, filter) {
        var founds = $filter('filter')(dataArray, filter);
        founds.forEach(function (found) {
            dataArray.splice(dataArray.indexOf(found), 1);
        })
    }

    function round(value, decimal) {
        var m = Math.pow(10, decimal);
        return Math.round(value * m) / m;
    }

    return factory;
}

