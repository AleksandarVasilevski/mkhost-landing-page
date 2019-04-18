
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

//Node mailer module
var main = require('../utils/mailer');

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile("index.html", { root : __dirname});
//   res.render('index', { title: 'Express' });
});

router.post('/contact', jsonParser, function(req, res, next) {
  var info = main(req.body.name, req.body.email, req.body.message);
  if(info){
    res.status(200).json({"status": 200, "message" : "successful"});
  } else {
    res.status(200).json({"status": 500, "message" : "unsuccessful"});
  }
});

module.exports = router;
