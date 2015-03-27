var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

router.get('/getAddressedTo', function(req, res) {
    mongoose.model('confirmations').find({addressedTo: req.query.id},{}).exec(function(err,user)
    {
        if (user.length) {
            mongoose.model('clients').populate(user, {path: 'addressedTo'}, function (err, client) {
                mongoose.model('clients').populate(user, {path: 'createdBy'}, function (err, client) {
                    res.send(client);
                });

            });
        }
        else
        {
            res.send([]);
        }
    });

});

router.get('/getAddressedToWithEmail', function(req, res) {
    mongoose.model('clients').find({email: req.query.email},{},function(err,user)
    {
        if (user.length)
        {
            mongoose.model('confirmations').find({addressedTo: user[0]._id}, {}).exec(function (err, user) {
                mongoose.model('clients').populate(user, {path: 'addressedTo'}, function (err, client) {
                    mongoose.model('clients').populate(user, {path: 'createdBy'}, function (err, client) {
                        res.send(client);
                    });

                });

            });
        }
        else
        {
            res.send([]);
        }
    });
});

router.get('/getCreatedBy', function(req, res) {
    mongoose.model('clients').find({email: req.query.email},{},function(err,user)
    {
        console.log(user);
        if (user.length)
        {
            mongoose.model('confirmations').find({createdBy: user[0]._id},{}).exec(function(err,user)
            {

                mongoose.model('clients').populate(user, {path: 'createdBy'},function(err,client)
                {

                    mongoose.model('clients').populate(user, {path: 'addressedTo'},function(err,client)
                    {
                        res.send(client);
                    });
                });

            });
        }
        else
        {
            res.send([]);
        }
    });

});


router.get('/getClientConfirmation',function(req,res)
{
    mongoose.model('confirmations').findById(req.query.id,{},function(err,user)
    {
        if (user)
        {
            console.log(user);
            res.send(user);
        }
        else
        {
            res.send(404);
        }

    });
});

router.delete('/:id',function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    return mongoose.model('confirmations').findByIdAndRemove(req.params.id, function (err) {
        if (!err) {
            console.log("removed");

        } else {
            console.log(err);
        }
    });
});

module.exports = router;
