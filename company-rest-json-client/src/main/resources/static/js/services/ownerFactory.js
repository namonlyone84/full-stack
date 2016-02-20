'use strict';

angular.module('companyAdminServices')
    .factory('OwnerFactory', ['$http', 'SpringDataRestAdapter', 'BaseFactory',
        function ($http, SpringDataRestAdapter, BaseFactory) {
            // Create our new custom object that reuse the original object constructor
            var AuthorityFactory = function () {
                BaseFactory.apply(this, arguments);
                this.ENTITIES = 'owners';
            };

            // Reuse the original object prototype
            AuthorityFactory.prototype = new BaseFactory();

            return AuthorityFactory;
        }]);