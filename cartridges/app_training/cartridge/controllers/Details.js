'use strict';

var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var Resource = require('dw/web/Resource');
var Transaction = require('dw/system/Transaction');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Logger = require('dw/system/Logger');
var log = Logger.getLogger('AddressPayment', 'AddressPayment');

// Main entry point
server.get('Show', csrfProtection.generateToken, function (req, res, next) {
    res.render('checkout/addressPaymentForm', {
        actionUrl: URLUtils.url('AddressPayment-HandleForm'),
        csrfTokenName: req.querystring.csrf_tokenName,
        csrfToken: req.querystring.csrf_token
    });
    next();
});

// Form submission handler
server.post('HandleForm', csrfProtection.validateAjaxRequest, function (req, res, next) {
    var form = req.form;
    var response = {};
    
    try {
        // Validate required fields
        if ( !form.firstName || !form.lastName || !form.address || !form.city || !form.country || !form.state || !form.zipCode || !form.cardNumber || !form.securityCode || !form.expirationMonth || !form.expirationYear) {
            throw new Error('Missing required fields');
        }

        Transaction.wrap(function () {
            // Check for existing record
            if (CustomObjectMgr.getCustomObject('AddressPaymentDetails', form.email)) {
                throw new Error('Email already exists');
            }

            var record = CustomObjectMgr.createCustomObject('AddressPaymentDetails', form.email);
            
            // Set all fields exactly as shown in BM
            record.custom.firstName = form.firstName;
            record.custom.lastName = form.lastName;
            record.custom.address = form.address;
            record.custom.phoneNumber = form.phoneNumber;
            record.custom.country = form.country;
            record.custom.state = form.state;
            record.custom.city = form.city;
            record.custom.zipCode = form.zipCode;  
            record.custom.securityCode = form.securityCode;         
            record.custom.cardNumber = form.cardNumber;
            record.custom.expirationMonth = form.expirationMonth;
            record.custom.expirationYear = form.expirationYear;
            record.custom.comments = form.comments;
            record.custom.email = form.email;
        });
        
        response.success = true;
        response.message = 'Data saved successfully';
    } catch (e) {
        log.error('Submission failed: ' + e.message);
        response.success = false;
        response.message = e.message;
    }
    
    res.json(response);
    next();
});

module.exports = server.exports();