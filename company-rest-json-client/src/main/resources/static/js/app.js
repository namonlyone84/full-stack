'use strict';

angular.module('companyAdminApp', [
            'ui.router',
            'ngSanitize',
            'angular-loading-bar',
            'ui.bootstrap',
            'angular-perfect-scrollbar',
            'angucomplete-alt',
            'ngLodash',
            'ngResource',
            'spring-data-rest',
            'angularSpinner',
            'companyAdminControllers',
            'companyAdminFilters',
            'companyAdminServices',
            'companyAdminDirectives',
            'ngTable'
        ])
        .config(['$httpProvider', 'cfpLoadingBarProvider', function ($httpProvider, cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
            $httpProvider.defaults.withCredentials = true;
        }]);

/* Controllers */
angular.module('companyAdminControllers', []);

/* Filters */
angular.module('companyAdminFilters', []);

/* Services */
angular.module('companyAdminServices', []);

/* Directives */
angular.module('companyAdminDirectives', []);

/*Override filter input template of ngTable library*/
angular.module('ngTable').run(['$templateCache', function ($templateCache) {
    $templateCache.put('ng-table/filters/text.html',
        '<input type="text" name="{{name}}" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="input-filter form-control" placeholder="{{getFilterPlaceholderValue(filter, name)}}"/>\
        <i class="glyphicon glyphicon-filter form-control-feedback"></i>');
}]);
