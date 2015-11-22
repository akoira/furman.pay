angular.module('app').directive('payOrderTitle', PayOrderTitleDirective);

function PayOrderTitleDirective() {
    var directive = {};
    directive.restrict = 'E';
    directive.scope = {
        order: '=order'
    };
    directive.templateUrl = 'app/PayOrderTitle.html';
    return directive;
}
