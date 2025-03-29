'use strict';

var server = require('server');
var BasketMgr = require('dw/order/BasketMgr');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    //viewData.example = "One string!"; // from module 04

    // current cart
    var currentBasket = BasketMgr.getCurrentBasket();
    if (currentBasket) {
        // obtain total cart value
        var cartTotal = currentBasket.totalGrossPrice.value;

        // verify if total is greater than or equal to 200
        if (cartTotal >= 200) {
            viewData.cartMessage = cartTotal.toFixed(2); // Set cartMessage(memored total cart value)
        }
    }

    res.setViewData(viewData);
    return next();
});

module.exports = server.exports();