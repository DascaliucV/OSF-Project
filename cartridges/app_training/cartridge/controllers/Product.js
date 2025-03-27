var server = require('server');
server.extend(module.superModule);

var ProductMgr = require('dw/catalog/ProductMgr');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');
var ProductSearch = require('*/cartridge/models/search/productSearch');
var CatalogMgr = require('dw/catalog/CatalogMgr');

server.append('Show', function (req, res, next) {
    var productId = res.getViewData().product.id;
    var product = ProductMgr.getProduct(productId);
    var suggestedProducts = [];

    if (product && product.isCategorized()) {
        var apiProductSearch = new ProductSearchModel();
        apiProductSearch.setCategoryID(product.getPrimaryCategory().ID);
        apiProductSearch.search();

        var productSearch = new ProductSearch(
            apiProductSearch,
            req.querystring,
            req.querystring.srule,
            CatalogMgr.getSortingOptions(),
            CatalogMgr.getSiteCatalog().getRoot()
        );

        for (var index = 0; index < 4 && index < productSearch.productIds.length; index++) {
            var suggestedProductId = productSearch.productIds[index].productID;
            var suggestedProduct = ProductMgr.getProduct(suggestedProductId);
            if (suggestedProduct) {
                suggestedProducts.push(suggestedProduct);
            }
        }
    }
    //var suggestedProducts = getSuggestedProducts(); // Funcție care returnează produsele sugestive
    //res.render('product/productDetails', {
      //  suggestedProducts: suggestedProducts
    //});
    res.setViewData({
       suggestedProducts: suggestedProducts
    });

    next();
});

module.exports = server.exports();
