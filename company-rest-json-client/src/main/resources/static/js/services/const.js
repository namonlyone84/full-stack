'use strict';

angular.module('companyAdminServices')
    .constant('searchEntities', {
        Company: {
            entity: 'company',
            pluralName: 'companies',
            addState: 'main.addCompany',
            editState: 'main.editCompany',
            dataField: '_embedded.companies',
            dataTitleField: 'firstName,lastName',
            dataDescriptionField: 'name',
            defaultSortField: 'name',
            filteringFields: ['username', 'firstName', 'lastName', 'company', 'validFrom', 'validTo']
        },
        Owner: {
            entity: 'owner',
            pluralName: 'owners',
            addState: 'main.addOwner',
            editState: 'main.editOwner',
            dataField: '_embedded.owners',
            dataTitleField: 'title',
            dataDescriptionField: 'name',
            defaultSortField: 'name',
            filteringFields: ['id', 'tenantId', 'nameEn', 'nameFr', 'nameGe', 'nameIt', 'validFrom', 'validTo']
        }
    });