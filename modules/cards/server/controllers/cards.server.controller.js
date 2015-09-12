'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  Article = mongoose.model('Article'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.generatePdf = function (req, res) {
  var jasper;
  console.log(req.body);
  console.log("inside generate pdf");
  switch (req.body.theme) {
    case 'plain':
      console.log("inside plain");
      jasper = require('node-jasper')({
        path: './node_modules/jasperreports-6.0.3/',
        reports: {
          "business_card": {
            jasper: '../jasperfiles/sample.jasper',
            jrxml: '../jasperfiles/sample.jrxml',
            conn: 'in_memory_json'
          }
        }
      });
      break;
    case 'withTheme':
      console.log("inside withtheme ");
      jasper = require('node-jasper')({
        path: './node_modules/jasperreports-6.0.3/',
        reports: {
          "business_card": {
            jasper: '../jasperfiles/busienssCard.jasper',
            jrxml: '../jasperfiles/busienssCard.jrxml',
            conn: 'in_memory_json'
          }
        }
      });
      break;
  }

  jasper.ready(function () {
    console.log("generating automatically");

    var r = jasper.export({
      report: 'business_card',
      data: {
        fullname: req.body.fullname,
        designation: req.body.designation,
        company: req.body.company,
        email: req.body.email,
        phoneno: req.body.phoneno,
        fax: req.body.fax
      },
      dataset: [{
        name: 'Gonzalo',
        lastname: 'Vinas' // TODO: check on UTF-8
      }, {
        name: 'Agustin',
        lastname: 'Moyano'
      }]
    }, 'pdf');


    fs.writeFile('public/files/yourcard_' + req.body.fullname + '.pdf', r, function (err) {
      if (err) {
        console.log(err);
        throw res.send(err);
      }
      res.send('files/yourcard_' + req.body.fullname + '.pdf');
    });
  });
}
