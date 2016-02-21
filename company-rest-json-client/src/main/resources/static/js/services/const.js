'use strict';

angular.module('companyAdminServices')
    .constant('searchEntities', {
        Company: {
            entity: 'company',
            pluralName: 'companies',
            addState: 'main.addCompany',
            editState: 'main.editCompany',
            defaultSortField: 'name'
        },
        Owner: {
            entity: 'owner',
            pluralName: 'owners',
            addState: 'main.addOwner',
            editState: 'main.editOwner',
            defaultSortField: 'name'
        }
    });