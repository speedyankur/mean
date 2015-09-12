'use strict';

// Configuring the Articles module
angular.module('cards').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Card',
      state: 'card',
      type: 'item',
      roles: ['*']
    });
  }
]);
