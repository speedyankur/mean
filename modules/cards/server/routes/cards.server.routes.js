'use strict';

/**
 * Module dependencies.
 */
var cardPolicy = require('../policies/cards.server.policy'),
  cards = require('../controllers/cards.server.controller');

module.exports = function (app) {
  //to generate card
  app.route('/api/cards/generatePdf').post(cards.generatePdf);
};
