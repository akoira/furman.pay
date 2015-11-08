'use strict';

angular.module('app.shift').service('shiftEditorService', ShiftEditorService);

function ShiftEditorService($filter, $log, shiftRepository, currentDayService) {
    var service = {};

    var refreshData = false;

    var listeners = {
        employees: [],
        works: [],
        orderAdded: [],
        orderRemoved: [],
        shift: [],
        clean: function clean() {
            listeners.shift.length = 0;
            listeners.orderAdded.length = 0;
            listeners.orderRemoved.length = 0;
            listeners.employees.length = 0;
            listeners.works.length = 0;
        }
    };

    service.shift = null;

    service.listeners = listeners;

    service.save = save;
    service.addEmployee = addEmployee;
    service.removeEmployee = removeEmployee;
    service.addWork = addWork;
    service.removeWork = removeWork;
    service.addOrder = addOrder;
    service.removeOrder = removeOrder;
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

    function removeEmployee(employee) {

    }

    function removeOrder(order) {

    }

    function addOrder(order) {
        if (!refreshData) {
            service.shift.orders.push(order);
            addValuesForOrder(order);
            listeners.orderAdded.forEach(function (l) {
                l(order);
            })
        }
    }

    function removeWork(work) {

    }

    function addWork(work) {
        if (!refreshData) {
            service.shift.works.push(work);
            addValuesForWork(work);
            fireWorkAdded(work);
        }
    }

    function getValue(order, work) {
        var founds = $filter('filter')(service.shift.values, {work: {id: work.id}, order: {id: order.id}});
        if (founds.length > 0) {
            return founds[0];
        } else {
            return null;
        }
    }

    function addValuesForOrder(order) {
        service.shift.works.forEach(function (work) {
            var value = getValue(order, work);
            if (!value) {
                value = {
                    work: work,
                    order: order,
                    value: $filter('filter')(order.orderValues, {work: {id: work.id}})[0].value
                }
                service.shift.values.push(value);
            }
        });
    }

    function addValuesForWork(work) {
        service.shift.orders.forEach(function (order) {
            var value = getValue(order, work);
            if (!value) {
                value = {
                    work: work,
                    order: order,
                    value: $filter('filter')(order.orderValues, {work: {id: work.id}})[0].value
                }
                service.shift.values.push(value);
            }
        });
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