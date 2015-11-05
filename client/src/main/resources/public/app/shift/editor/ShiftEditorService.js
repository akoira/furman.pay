'use strict';

angular.module('app.shift').service('shiftEditorService', ShiftEditorService);

function ShiftEditorService($log, shiftRepository, currentDayService) {
    var service = {};

    var shift = {
        name: "",
        employees: [],
        works: [],
        orders: []
    };


    var listeners = {
        employees: [],
        works: [],
        orders: []
    };

    service.shift = shift;
    service.listeners = listeners;

    service.save = save;
    service.addEmployee = addEmployee;
    service.addWork = addWork;
    service.addOrder = addOrder;

    function addEmployee(employee) {
        shift.employees.push("/api/pay/employee/" + employee.id);
        $log.log(shift);

        fireEmployeeAdded(employee);
    }

    function addOrder(order) {
        shift.orders.push("/api/pay/dayOrder/" + order.id);
        fireOrderAdded(order);
    }


    function addWork(work) {
        shift.works.push("/api/pay/work/" + work.id);
        fireWorkAdded(work);
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
        shift = shiftRepository.save(shift);
        currentDayService.dayShifts.push(shift);
    }

    return service;

}