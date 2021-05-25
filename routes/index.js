//import module
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/new/:url(*)',function(req,res,next) {
  var {url} = req.params;
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if(regex.test(url)==true){
    var short = Math.floor(Math.random()*10000).toString();
    var newUser = {};
    newUser.sourceURL = url;
    newUser.finalURL = short;
    localStorage.setItem(newUser.finalURL, newUser.sourceURL);
    return res.json({'Source URL':newUser.sourceURL, 'Final URL':newUser.finalURL});
  }
  else{
    return res.json({url: 'Does not comply with the established parameters of a URL'});
  }
});

router.get('/:urls',(req,res,next) => {
  var shorterUrl = req.params.urls;
  var finalUrl = localStorage.getItem(shorterUrl);

  if(finalUrl == null){
    res.json({
      "error": true,
      "msg": `Bad request to ${shorterUrl} not found in local storage. try again`
    })
  } else {
    res.redirect(301, finalUrl)
  }

  // console.log(finalUrl);
  // shortUrl.findOne({'finalURL': shorterUrl}, (err, data) => {
  //   if(err) return res.send('Error reading db');
  //   var newUrl=data.sourceURL;
  //   res.redirect(newUrl);
  // });
});

module.exports = router;
