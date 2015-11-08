'use strict';

angular.module('app.shift').service('shiftEditorService', ShiftEditorService);

function ShiftEditorService($filter, $log, commonUtils, shiftRepository, currentDayService, dayShiftService) {
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
            shiftRepository.update(prepareToSave(service.shift));
        } else {
            var saved = shiftRepository.save(prepareToSave(service.shift));
            saved.$promise.then(function (result) {
                service.shift.id = result.id;
                currentDayService.dayShifts.push(service.shift);
                setShift(service.shift);
            });
        }
    }

    function prepareToSave(shift) {
        var toSave = jQuery.extend(true, {}, shift);

        shift.employees.forEach(function (employee, index) {
            toSave.employees[index] = "/api/pay/employee/" + employee.id;
        });

        shift.works.forEach(function (work, index) {
            toSave.works[index] = "/api/pay/work/" + work.id;
        });

        shift.orders.forEach(function (order, index) {
            toSave.orders[index] = "/api/pay/order/" + order.id;
        });

        shift.values.forEach(function (value, index) {
            toSave.values[index].order = "/api/pay/order/" + value.order.id;
            toSave.values[index].work = "/api/pay/work/" + value.work.id;
        });

        toSave.day = "/api/pay/day/" + shift.day.id;
        return toSave;
    }

    return service;

}