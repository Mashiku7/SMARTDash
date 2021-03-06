var access = require('../access');
var express = require('express');
var router = express.Router();
var request = require('request');

// Models
var User = require('../models/user');
var Goal = require('../models/goal');

router.get('/progress', access.requireLogin, function(req, res) {
    if(req.session.user) {
        request.get({url:`http://api.reimaginebanking.com/accounts/${req.session.user.accountid}/deposits?key=2166680e61b8f43aaebf22492d3fbf65` }, function optionalCallback(err, httpResponse, body)  {
            if (err) {
                console.error('get failed: ', err);
                res.json({
                    'success': 0
                });
            } else {
                var response = "";
                var i = 0;
                console.log(JSON.parse(body)[0].amount);
                for(var list in JSON.parse(body)) {
                    response = response.concat(JSON.parse(body)[list].amount + ",");
                }
                console.log(response);
                res.json({
                    'success': 1,
                    data: response
                });
            }
        });
    }
});
module.exports = router;
