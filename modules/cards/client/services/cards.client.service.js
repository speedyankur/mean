'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Cards',
  function ($http) {
    var Cards = {};
    Cards.generatePdf = function (postdata) {
      return $http.post('api/cards/generatePdf', postdata);
    };
    return Cards;
  });
