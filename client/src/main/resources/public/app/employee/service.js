'use strict';

angular.module('app.employee').service('employeeEditorService', EmployeeEditorService);

function EmployeeEditorService() {
    var service = {};
    var employeeSelectedListeners = [];
    var employeeAddedListeners = [];

    service.addEmployeeSelectedListener = addEmployeeSelectedListener;
    service.removeEmployeeSelectedListener = removeEmployeeSelectedListener;
    service.addEmployeeAddedListener = addEmployeeAddedListener;
    service.removeEmployeeAddedListener = removeEmployeeAddedListener;
    service.employeeAdded = employeeAdded;
    service.employeeSelected = employeeSelected;

    function addEmployeeSelectedListener(listener) {
        employeeSelectedListeners.push(listener);
    }

    function removeEmployeeSelectedListener(listener) {
        var index = employeeSelectedListeners.indexOf(listener);
        if (index > -1) {
            employeeSelectedListeners.splice(index, 1);
        }
    }

    function addEmployeeAddedListener(listener) {
        employeeAddedListeners.push(listener);
    }

    function removeEmployeeAddedListener(listener) {
        var index = employeeAddedListeners.indexOf(listener);
        if (index > -1) {
            employeeAddedListeners.splice(index, 1);
        }
    }


    function employeeSelected(employee) {
        angular.forEach(employeeSelectedListeners, function (listener) {
            listener(employee);
        });
    }

    function employeeAdded(employee) {
        angular.forEach(employeeAddedListeners, function (listener) {
            listener(employee);
        });
    }

    return service;
}