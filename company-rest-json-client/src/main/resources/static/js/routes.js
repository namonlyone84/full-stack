'use strict';

angular.module('companyAdminApp')
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 'searchEntities',
        function ($locationProvider, $stateProvider, $urlRouterProvider, searchEntities) {

            $locationProvider.html5Mode(true);

            $urlRouterProvider.when('/', '/home');
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('main', {
                    url: '',
                    views: {
                        'header': {
                            templateUrl: 'views/partials/header.html'
                        },
                        '': {
                            templateUrl: 'views/main.html',
                            abstract: true
                        }
                    }
                })
                .state('main.home', {
                    url: '/home',
                    data: {
                        searchEntity: {}
                    }
                })
                .state('main.listCompanies', {
                    url: '/companies',
                    templateUrl: 'views/companyList.html',
                    controller: 'ListCtrl',
                    data: {
                        searchEntity: searchEntities.Company
                    }
                })
                .state('main.addCompany', {
                    url: '/company/add',
                    templateUrl: 'views/companyForm.html',
                    controller: 'CompanyCtrl',
                    data: {
                        searchEntity: searchEntities.Company
                    }
                })
                .state('main.editCompany', {
                    url: '/company/:id',
                    templateUrl: 'views/companyForm.html',
                    controller: 'CompanyCtrl',
                    data: {
                        searchEntity: searchEntities.Company
                    }
                })
                .state('main.listOwner', {
                    url: '/owners',
                    templateUrl: 'views/ownerList.html',
                    controller: 'ListCtrl',
                    data: {
                        searchEntity: searchEntities.Owner
                    }
                })
                .state('main.addOwner', {
                    url: '/owner/add',
                    templateUrl: 'views/ownerForm.html',
                    controller: 'OwnerCtrl',
                    data: {
                        searchEntity: searchEntities.Owner
                    }
                })
                .state('main.editOwner', {
                    url: '/owner/:id',
                    templateUrl: 'views/ownerForm.html',
                    controller: 'OwnerCtrl',
                    data: {
                        searchEntity: searchEntities.Owner
                    }
                })

        }]);