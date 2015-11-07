'use strict';

angular.module('app').factory('commonUtils', CommonUtils);

function CommonUtils($filter) {
    var factory = this;
    factory.selectEntityRows = selectEntityRows;
    factory.registerRowSelection = registerRowSelection;

    function selectEntityRows(entitiesToSelect, gridOptions, gridApi) {
        gridApi.selection.clearSelectedRows();
        angular.forEach(entitiesToSelect, function (entity) {
            var founds = $filter('filter')(gridOptions.data, {id: entity.id});
            angular.forEach(founds, function (found) {
                gridApi.selection.selectRow(found);
            })
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


    return factory;
}

