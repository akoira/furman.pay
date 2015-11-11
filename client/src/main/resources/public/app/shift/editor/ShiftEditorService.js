'use strict';

angular.module('app.shift').service('shiftEditorService', ShiftEditorService);

function ShiftEditorService($filter, $log, commonUtils, dayShiftRepository, dayEditorService, dayShiftService) {
    var service = {};

    var listeners = {
        employeeAdded: [],
        employeeRemoved: [],
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
            listeners.employeeAdded.length = 0;
            listeners.employeeRemoved.length = 0;
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
    service.updateForRow = updateForRow;

    function refreshView() {
        fireShiftChanged(service.shift);
    }


    function setShift(shift) {
        service.shift = shift;
        fireShiftChanged(shift);
    }

    function addEmployee(employee) {
        service.shift.employees.push(employee);
        listeners.employeeAdded.forEach(function (l) {
            l(service.shift, employee);
        })
    }

    function removeEmployee(employee) {
        service.shift.employees.splice(service.shift.employees.indexOf(employee), 1);
        listeners.employeeRemoved.forEach(function (l) {
            l(service.shift, employee);
        })
    }

    function removeOrder(order) {
        dayShiftService.removeDayOrderFromDayShift(order, service.shift);
        listeners.orderRemoved.forEach(function (l) {
            l(service.shift, order);
        })
    }

    function addOrder(order) {
        service.shift.orders.push(order);
        addValuesForOrder(order);
        listeners.orderAdded.forEach(function (l) {
            l(service.shift, order);
        })
    }

    function removeWork(work) {
        service.shift.works.splice(service.shift.works.indexOf(work), 1);
        commonUtils.removeFromArrayByFilter(service.shift.values, {work: {id: work.id}});
        listeners.workRemoved.forEach(function (l) {
            l(service.shift, work);
        })
    }


    function addWork(work) {
        service.shift.works.push(work);
        addValuesForWork(work);
        listeners.workAdded.forEach(function (l) {
            l(service.shift, work);
        })
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

    function updateForRow() {
        return dayShiftService.update(service.shift).$promise;
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