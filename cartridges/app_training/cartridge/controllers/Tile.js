'use strict';

var server = require('server');
var productHelpers = require('*/cartridge/scripts/helpers/productHelpers');
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    var discountPercentage = null;

    //  Price information
    //viewData.product for display discount
    if (viewData.product.price.list && viewData.product.price.sales) {
        var price = viewData.product.price;
        var standardPrice = price.list.decimalPrice;
        var salePrice = price.sales.decimalPrice;

        if (standardPrice > 0 && salePrice > 0) {
            // Calculate the discount percentage
            discountPercentage = productHelpers.calculatePercentageOff(
                parseFloat(standardPrice),
                parseFloat(salePrice)
            );
        }
    }

    // Pass the discount percentage to the template
    viewData.discountPercentage = discountPercentage;
    res.setViewData(viewData);

    return next();
});

module.exports = server.exports();