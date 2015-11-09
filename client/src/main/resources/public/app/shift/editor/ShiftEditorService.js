'use strict';

angular.module('app.shift').service('shiftEditorService', ShiftEditorService);

function ShiftEditorService($filter, $log, commonUtils, dayShiftRepository, dayEditorService, dayShiftService) {
    var service = {};

    var listeners = {
        enable: true,
        employees: [],
        works: [],
        orderAdded: [],
        orderRemoved: [],
        workAdded: [],
        workRemoved: [],
        shift: [],
        clean: function clean() {
            listeners.shift.length = 0;
            listeners.orderAdded.length = 0;
            listeners.orderRemoved.length = 0;
            listeners.employees.length = 0;
            listeners.workAdded.length = 0;
            listeners.workRemoved.length = 0;
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
        listeners.enable = false;
        service.shift = shift;

        fireShiftChanged(shift);
        listeners.enable = true;
    }

    function addEmployee(employee) {
        if (listeners.enable) {
            service.shift.employees.push(employee);
            fireEmployeeAdded(employee);
        }
    }

    function removeEmployee(employee) {

    }

    function removeOrder(order) {
        if (listeners.enable) {
            dayShiftService.removeDayOrderFromDayShift(order, service.shift);
            listeners.orderRemoved.forEach(function (l) {
                l(service.shift, order);
            })
        }
    }

    function addOrder(order) {
        if (listeners.enable) {
            service.shift.orders.push(order);
            addValuesForOrder(order);
            listeners.orderAdded.forEach(function (l) {
                l(service.shift, order);
            })
        }
    }

    function removeWork(work) {
        if (listeners.enable) {
            service.shift.works.splice(service.shift.works.indexOf(work), 1);
            commonUtils.removeFromArrayByFilter(service.shift.values, {work: {id: work.id}});
            listeners.workRemoved.forEach(function (l) {
                l(service.shift, work);
            })
        }
    }


    function addWork(work) {
        if (listeners.enable) {
            service.shift.works.push(work);
            addValuesForWork(work);
            listeners.workAdded.forEach(function (l) {
                l(service.shift, work);
            })
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


    function fireEmployeeAdded(employee) {
        angular.forEach(listeners.employees, function (listener) {
            listener(employee);
        });
    }

    function save() {
        if (service.shift.id) {
            dayShiftService.update(service.shift);
        } else {
            var saved = dayShiftService.save(service.shift);
            saved.$promise.then(function (result) {
                service.shift.id = result.id;
                dayEditorService.dayShifts.push(service.shift);
                setShift(service.shift);
            });
        }
    }
    return service;

}