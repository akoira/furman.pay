angular.module('app.order').service('payOrderInfoService', PayOrderInfoService);

function PayOrderInfoService(dayService) {

    var listeners = [];
    var service = {
        payOrderInfo: null
    };

    service.load = load;
    service.addListener = addListener;

    function addListener(l) {
        listeners.push(l);
    }

    function load(payOrderId) {
        dayService.getPayOrderInfo(payOrderId).then(function (data) {
            service.payOrderInfo = data.data;
            listeners.forEach(function (l) {
                l(service.payOrderInfo);
            });
        }, function (data) {
        });
    }

    return service;
}
