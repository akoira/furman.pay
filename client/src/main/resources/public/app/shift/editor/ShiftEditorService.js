'use strict';

angular.module('app.shift').service('shiftEditorService', ShiftEditorService);

function ShiftEditorService($log, shiftRepository, currentDayService) {
    var service = {};

    var refreshData = false;

    var listeners = {
        employees: [],
        works: [],
        orders: [],
        shift: [],
        clean: function clean() {
            listeners.shift.length = 0;
            listeners.orders.length = 0;
            listeners.employees.length = 0;
            listeners.works.length = 0;
        }
    };

    service.shift = null;

    service.listeners = listeners;

    service.save = save;
    service.addEmployee = addEmployee;
    service.addWork = addWork;
    service.addOrder = addOrder;
    service.setShift = setShift;
    service.refreshView = refreshView;

    function refreshView() {
        fireShiftChanged(service.shift);
    }


    function setShift(shift) {
        refreshData = true;
        service.shift = shift;

        fireShiftChanged(shift);
        refreshData = false;
    }

    function addEmployee(employee) {
        if (!refreshData) {
            service.shift.employees.push(employee);
            fireEmployeeAdded(employee);
        }
    }

    function addOrder(order) {
        if (!refreshData) {
            service.shift.orders.push(order);
            fireOrderAdded(order);
        }
    }


    function addWork(work) {
        if (!refreshData) {
            service.shift.works.push(work);
            fireWorkAdded(work);
        }
    }

    function fireShiftChanged(shift) {
        angular.forEach(listeners.shift, function (listener) {
            listener(shift);
        });
    }

    function fireOrderAdded(order) {
        angular.forEach(listeners.orders, function (listener) {
            listener(order);
        });
    }


    function fireEmployeeAdded(employee) {
        angular.forEach(listeners.employees, function (listener) {
            listener(employee);
        });
    }

    function fireWorkAdded(work) {
        angular.forEach(listeners.works, function (listener) {
            listener(work);
        });
    }


    function save() {
        if (service.shift.id) {
            shiftRepository.update(prepareToSave(service.shift));
        } else {
            var saved = shiftRepository.save(prepareToSave(service.shift))
            service.shift.id = saved.id;
            currentDayService.dayShifts.push(service.shift);
            setShift(service.shift);
        }
    }

    function prepareToSave(shift) {
        var toSave = jQuery.extend(true, {}, shift);

        angular.forEach(shift.employees, function (employee, index) {
            toSave.employees[index] = "/api/pay/employee/" + employee.id;
        });

        angular.forEach(shift.works, function (work, index) {
            toSave.works[index] = "/api/pay/work/" + work.id;
        });

        angular.forEach(shift.orders, function (order, index) {
            toSave.orders[index] = "/api/pay/order/" + order.id;
        });

        toSave.day = "/api/pay/day/" + shift.day.id;
        return toSave;
    }

    return service;

}