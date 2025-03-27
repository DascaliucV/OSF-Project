'use strict';

var server = require('server');  
var dw = require('dw/system'); 

// Extend controller PaymentInstruments
server.extend(module.superModule);

server.append('Begin', function (req, res, next) {
    var viewData = res.getViewData();

    res.render('checkout/checkout', viewData);
    next();
});

module.exports = server.exports();