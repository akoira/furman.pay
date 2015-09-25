angular.module('app.shift').factory('Shift', function ($resource) {
    return $resource('/api/pay/shift/:id', {id: '@_id'}, {
        update: {
            method: 'PUT' // this method issues a PUT request
        }
    });
});