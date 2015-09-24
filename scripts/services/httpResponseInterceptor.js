angular.module('galebWebui')
.factory('httpResponseInterceptor', function($q, $location, $localStorage) {
    return {
        'request': function (config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
                config.headers['x-auth-token'] = $localStorage.token;
            }
            return config;
        },
        'responseError': function(response) {
            if(response.status === 0 || response.status === 401 || response.status === 403) {
                $location.path('logout');
            }
            return $q.reject(response);
        }
    };
});