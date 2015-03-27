/**
 * Created by gustavhlavac on 18/12/14.
 */
var express = require('express');
var router = express.Router();

router.get('/main', function(req, res){
    res.render('main', {someValue: ' ', body: ' '});
});