'use strict';

angular.module('app.home', ['mwl.calendar', 'ui.bootstrap'])
    .controller('HomeController', HomeController);

function HomeController($scope, $location, $filter, $log, dayEditorService, dayService, dayOrderService) {

    var vm = this;

    if (!dayEditorService.day) {
        dayService.getOrNewDay(new Date()).success(function (day) {
            dayEditorService.changeDay(day);
        });
    }

    vm.calendar = {
        view: "month",
        day: dayEditorService.day ? dayEditorService.getDate() : new Date(),
        events: [],
        createNewDay: function (calendarDate) {
            dayService.getOrNewDay(calendarDate).success(function (day) {
                dayEditorService.changeDay(day);
                var query = {day: {id: day.id}};
                var event = $filter('filter')(vm.calendar.events, query);
                if (event.length == 0) {
                    vm.calendar.events.push(day2Event(day));
                }
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
        dayService.getDays(moment(date).startOf('month'),
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
            day: day
        };
        var date = moment(dayEditorService.dateOf(day.date));
        event.title = date.format('YYYY-MM-DD');
        event.startsAt = date.toDate();
        event.endAt = date.toDate();
        dayOrderService.countForDay(day).then(function (data) {
            event.type = data.data < 1 ? 'warning' : 'info';
        });
        return event;
    }
}