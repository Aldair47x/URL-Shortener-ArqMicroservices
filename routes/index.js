var express = require('express');
var router = express.Router();
var useragent = require('express-useragent');
var ipAdress = require('ip');
 


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/api/whoami',function(req,res){
  const language = req.acceptsLanguages();
  const software = "OS: " + req.useragent.os + ", Browser: " + req.useragent.browser;
  const ip = ipAdress.address();
  // res.json({'ipaddress': ip, 'language':language[0], 'software':software}).pretty();
  res.json(req.useragent)

});

module.exports = router;
