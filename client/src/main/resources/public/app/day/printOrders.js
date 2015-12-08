'use strict';

angular.module('app.day').controller('printOrderCtrl', PrintOrderCtrl);

function PrintOrderCtrl($scope, $modalInstance, day, commonUtils, dayOrderService) {
    var vm = this;
    vm.day = day;
    vm.dayDate = commonUtils.localDate2Date(vm.day.date);
    vm.dayOrders = [];
    vm.localDate2Date = commonUtils.localDate2Date;
    vm.print = function print() {
        var iframe = document.createElement("iframe"); // create the element
        document.body.appendChild(iframe);  // insert the element to the DOM

        var html = "<body>\n" + angular.element('#print-content').html() + "\n</body>";
        html = "<head><link rel='stylesheet' href='webjars/bootstrap/3.3.5/css/bootstrap.css'>\n" +
            "</head>" +
            html;
        iframe.contentWindow.document.write(html); //// write the HTML to be printed
        iframe.contentWindow.print();  // print it
        document.body.removeChild(iframe); // remove the iframe from the DOM
    }

    dayOrderService.findAllForDay(vm.day).then(function (data) {
        vm.dayOrders = data.data;
    });
}