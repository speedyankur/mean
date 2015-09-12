'use strict';

// Setting up route
angular.module('cards').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('card', {
        url: '/generate/card',
        templateUrl: 'modules/cards/client/views/create-card.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
