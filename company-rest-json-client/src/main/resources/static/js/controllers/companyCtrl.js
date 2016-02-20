'use strict';

angular.module('companyAdminControllers')
    .controller('CompanyCtrl', [
        '$scope',
        '$state',
        '$stateParams',
        'OwnerFactory',
        'CompanyFactory',
        'lodash',
        'ModalService',
        'NotificationService',
        'SpinService',
        'commonService',
        'OwnerCompanyFactory',
        function ($scope, $state, $stateParams, OwnerFactory, CompanyFactory, _, ModalService, NotificationService, SpinService, commonService, OwnerCompanyFactory) {

            $scope.messages = {
                create: {
                    success: 'Company created successfully.',
                    error: 'Failed to created company.',
                    existed: 'A company with this ID already exists'
                },
                update: {
                    success: 'Company updated successfully.',
                    error: 'Failed to update company.'
                },
                delete: {
                    error: 'Failed to delete company.',
                    success: 'Company deleted successfully.',
                    warning: 'This company is being assigned to {x}'
                },
                validation: {
                    invalidNumber: 'Company ID must be a number',
                    validToInvalid: 'Valid To date cannot be before Valid From date'
                },
                error: {
                    notFound: 'Company not found.',
                    defaultError: 'There was an error while trying to request server.'
                },
                owner: {
                    add: {
                        error: 'Failed to add owner to this company'
                    },
                    remove: {
                        error: 'Failed to remove owner from this company'
                    }
                }
            };

            // Initial libraries
            var companyFactory = new CompanyFactory();
            var ownerCompanyFactory = new OwnerCompanyFactory();
            var ownerFactory = new OwnerFactory();

            $scope.defaultCompanyModel = {
                id: null,
                name: null,
                address: null,
                city: null,
                country: null,
                email: null,
                phone: null
            };

            // Initial all status
            $scope.editMode = $stateParams.id ? true : false;
            $scope.posting = false;

            // Company
            $scope.companyId = null;
            $scope.isExisted = false;

            // Owner
            $scope.addSelectedOwners = [];
            $scope.removeSelectedOwners = [];
            $scope.allOwners = [];

            $scope.legend = 'New Company';

            commonService.watchFilterToScrollUp($scope, 'searchOwners', document.getElementById('assignable-owners'));
            commonService.watchFilterToScrollUp($scope, 'searchAssignedOwners', document.getElementById('assigned-owners'));

            // Initialize company model
            if ($scope.editMode) {
                // Edit mode
                if ($stateParams.companyModel) {
                    // If model is cached from create form
                    $scope.companyModel = $stateParams.companyModel;
                    $scope.companyId = $stateParams.companyModel.id;

                    updateLegend();
                } else {
                    // Get model from server
                    $scope.companyId = $stateParams.id;

                    companyFactory.get($scope.companyId, function (companyModelResponse) {
                        $scope.companyModel = companyModelResponse;
                        updateLegend();
                    }, function (response) {
                        errorCallback(response);
                        $state.go('main.listCompanies');
                    });
                }

                // Get list of all owners
                ownerFactory.getAll(function (ownersResponse) {
                    // Cache list of owners
                    $scope.allOwners = ownersResponse;
                    refresh();
                }, errorCallback);

            } else {
                companyFactory.init($scope.defaultCompanyModel, function (companyModel) {
                    $scope.companyModel = companyModel;
                });
            }

            // Create or Update
            $scope.submit = function () {
                if ($scope.companyForm.$valid && !$scope.isExisted) {
                    prepareRequest();

                    if ($scope.editMode) {
                        // Update company
                        $scope.companyModel.save(function () {
                            updateLegend();
                            NotificationService.notify($scope.messages.update.success, true);
                        }, function () {
                            NotificationService.notify($scope.messages.update.error, true);
                        }, function () {
                            $scope.posting = false;
                        });
                    } else {
                        // Check company exist
                        companyFactory.get($scope.companyModel.id, function () {
                            // If the company existed then error
                            NotificationService.notify($scope.messages.create.existed, false);
                            $scope.posting = false;
                        }, function () {
                            // If the company hasn't existed yet then create new company
                            $scope.companyModel.save(function () {
                                // Switch to edit mode
                                $state.go('main.listCompanies');
                                NotificationService.notify($scope.messages.create.success, true);
                            }, function () {
                                NotificationService.notify($scope.messages.create.error, false);
                            }, function () {
                                $scope.posting = false;
                            });
                        });
                    }
                }
            };

            // Delete company
            $scope.deleteCompany = function () {
                askToDelete();
            };

            // Add owners for company
            $scope.addOwners = function () {
                var addedompanyOwners = buildCompanyOwnerDataToAdd($scope.addSelectedOwners, $scope.companyModel);
                SpinService.spin();
                ownerCompanyFactory.addOwnersForCompany(addedompanyOwners, function () {
                    refresh();
                }, function () {
                    NotificationService.notify($scope.messages.owner.add.error, false);
                }, function () {
                    SpinService.stop();
                });
            };

            // Remove owners for company
            $scope.removeOwners = function () {
                var deletedCompanyOwners = buildCompanyOwnersToDelete($scope.removeSelectedOwners);
                SpinService.spin();
                ownerCompanyFactory.removeOwnersForCompany(deletedCompanyOwners, function () {
                    refresh();
                }, function () {
                    NotificationService.notify($scope.messages.owner.remove.error, false);
                }, function () {
                    SpinService.stop();
                });
            };

            // Check exist company id
            /*
             $scope.isExistedcompanyId = function () {
             $scope.isExisted = false;
             companyFactory.get($scope.companyModel.id, function () {
             $scope.isExisted = true;
             });
             };
             */

            $scope.getOwnerName = function (owner) {
                return owner.name;
            };

            function askToDelete() {
                prepareRequest();
                ModalService.openDeleteModal('company', '', function () {
                    $scope.companyModel.remove(function () {
                        NotificationService.notify($scope.messages.delete.success, true);
                        $state.go('main.listCompanies');
                    }, function () {
                        NotificationService.notify($scope.messages.delete.error, false);
                    }, function () {
                        $scope.posting = false;
                    });
                }, function () {
                    $scope.posting = false;
                });
            }

            /**
             * Request to server to get new list of company owners
             */
            function refresh() {
                prepareRequest();
                $scope.removeSelectedOwners = [];
                $scope.addSelectedOwners = [];

                // Get list of owners belong to company
                ownerCompanyFactory.getOwnersByCompany($scope.companyId, function (ownersByCompany) {
                    $scope.ownersByCompany = ownersByCompany;
                    var ownerIdsByCompany = _.pluck(ownersByCompany, 'ownerId');

                    // Build list of assigned owners
                    $scope.assignedOwners = ownerIdsByCompany.length ? _.filter($scope.allOwners, function (owner) {
                        return _.contains(ownerIdsByCompany, owner.id);
                    }) : undefined;

                    // Build list of assignable owners
                    $scope.assignableOwners = _.difference($scope.allOwners, $scope.assignedOwners);
                }, errorCallback, function () {
                    $scope.posting = false;
                });
            }

            /**
             * Build company owner models from company and list of owners.
             * @param selectedOwners
             * @param companyModel
             * @returns {Array}
             */
            function buildCompanyOwnerDataToAdd(selectedOwners, companyModel) {
                var addedCompanyOwners = [];
                for (var i = 0; i < selectedOwners.length; i++) {
                    addedCompanyOwners.push({
                        companyId: companyModel.id,
                        ownerId: Number(selectedOwners[i])
                    });
                }
                return addedCompanyOwners;
            }

            /**
             * Build list of owner ids that need to delete
             * @param selectedOwners
             * @returns {Array}
             */
            function buildCompanyOwnersToDelete(selectedOwners) {
                var deletedCompanyOwners = [];
                for (var i = 0; i < selectedOwners.length; i++) {
                    var ownerCompany = _.findWhere($scope.ownersByCompany, {'ownerId': parseInt(selectedOwners[i])});
                    deletedCompanyOwners.push(ownerCompany.id);
                }
                return deletedCompanyOwners;
            }

            /**
             * Reset all status before every request to server
             */
            function prepareRequest() {
                $scope.posting = true;
            }

            function errorCallback(response) {
                var errorMessage;
                switch (response.status) {
                    case 404:
                        errorMessage = $scope.messages.error.notFound;
                        break;
                    default :
                        errorMessage = $scope.messages.error.defaultError;
                }

                NotificationService.notify(errorMessage, false);
            }

            function updateLegend() {
                $scope.legend = $scope.companyModel.name;
            }
        }]);