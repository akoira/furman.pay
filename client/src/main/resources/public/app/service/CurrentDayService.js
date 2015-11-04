'use strict';

angular.module('app.service').service('currentDayService', CurrentDayService);

function CurrentDayService() {
    var service = {};
    var listeners = [];

    service.day = null;
    service.changeDay = changeDay;
    service.addListener = addListener;
    service.getDate = getDate;
    service.dateOf = dateOf;

    function changeDay(newDay) {
        service.day = newDay;
        listeners.forEach(function (l) {
            l(newDay);
        });
    }

    function getDate() {
        return dateOf(service.day);
    }

    function dateOf(day) {
        return moment({year: day.date[0], month: day.date[1] - 1, day: day.date[2]}).toDate();
    }


    function addListener(listener) {
        listeners.push(listener);
    }

    return service;
}

