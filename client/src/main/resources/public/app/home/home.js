'use strict';

angular.module('app.home', ['mwl.calendar', 'ui.bootstrap'])
    .controller('HomeController', HomeController);

function HomeController($scope, $location, $log, CurrentDay, DayEditorService) {

    var vm = this;

    if (!CurrentDay.day) {
        DayEditorService.getOrNewDay(new Date()).success(function (day) {
            CurrentDay.changeDay(day);
        });
    }

    vm.calendar = {
        view: "month",
        day: CurrentDay.day ? CurrentDay.getDate() : new Date(),
        events: [],
        createNewDay: function (calendarDate) {
            DayEditorService.getOrNewDay(calendarDate).success(function (day) {
                CurrentDay.changeDay(day);
            });
        },
        dayEdit: function (event) {
            $location.path('/day');
        }
    };

    $scope.$watch(function () {
            return vm.calendar.day
        },
        function () {
            loadAllDays(moment(vm.calendar.day));
        }
    );

    function loadAllDays(date) {
        vm.calendar.events = [];
        DayEditorService.getDays(moment(date).startOf('month'),
            moment(date).endOf('month')).success(function (days) {
                angular.forEach(days, function (day) {
                    vm.calendar.events.push(day2Event(day));
                });
            });
    }

    function day2Event(day) {
        var event = {
            editable: false,
            deletable: false,
            draggable: false,
            resizable: false,
            day: day,
            isWarning: function () {
                return ((this.day.shifts == null || this.day.shifts.length < 1) && (this.day.orders == null || this.day.orders.length < 1));
            }
        };
        var date = moment(CurrentDay.dateOf(day));
        event.title = date.format('YYYY-MM-DD');
        event.type = event.isWarning() ? 'warning' : 'info';
        event.startsAt = date.toDate();
        event.endAt = date.toDate();
        return event;
    }
}