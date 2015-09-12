'use strict';

// Articles controller
angular.module('articles').controller('CardController', ['$window', '$scope', '$http', '$stateParams', '$location', 'Authentication', 'Articles', 'Cards',
  function ($window, $scope, $http, $stateParams, $location, Authentication, Articles, Cards) {
    $scope.authentication = Authentication;
    $scope.card = {
      "theme": 'plain'
    }
    $scope.generateCard = function ($http) {
      $scope.loading = true;
      Cards.generatePdf($scope.card).success(function (response) {
          $scope.loading = false;
          $window.open(response);
        })
        .error(function (error) {
          console.log(error);
        })
    };
  }
]);
