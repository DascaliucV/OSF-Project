'use strict';
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');

module.exports = {
    saveData: function (data) {
        var customObject;
        Transaction.wrap(function () {
            customObject = CustomObjectMgr.createCustomObject('CustomerAddressPayment', data.APD);
            customObject.custom.firstName = data.firstName;
            customObject.custom.lastName = data.lastName;
            customObject.custom.city = data.city;
            customObject.custom.comments = data.comments;
            customObject.custom.securityCode = data.securityCode;
            customObject.custom.expirationMonth = data.expirationMonth;
            customObject.custom.expirationYear = data.expirationYear;
            customObject.custom.email = data.email;
            customObject.custom.cardNumber = data.cardNumber;
            customObject.custom.state = data.state;
            customObject.custom.country = data.country;
            customObject.custom.phoneNumber = data.phoneNumber;
            customObject.custom.address = data.address;
            customObject.custom.zipCode = data.zipCode;
            customObject.custom.APD = data.APD;
c
        });
        return customObject.custom.APD;
    },

    getData: function (APD) { 
        var customObject = CustomObjectMgr.getCustomObject('CustomerAddressPayment', APD);
        if (customObject) {
            return {
                firstName: customObject.custom.firstName,
                lastName: customObject.custom.lastName,
                city: customObject.custom.city,
                comments: customObject.custom.comments,
                securityCode: customObject.custom.securityCode,
                expirationMonth: customObject.custom.expirationMonth,
                expirationYear: customObject.custom.expirationYear,
                email: customObject.custom.email,
                cardNumber: customObject.custom.cardNumber,
                state: customObject.custom.state,
                country: customObject.custom.country,
                phoneNumber: customObject.custom.phoneNumber,
                address: customObject.custom.address,
                zipCode: customObject.custom.zipCode,
                APD: customObject.custom.APD;
            };
        }
        return null;
    }
};