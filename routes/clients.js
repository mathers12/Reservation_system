var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var bcrypt = require('bcrypt');
/* GET users listing. */
router.get('/', function(req, res) {
    mongoose.model('clients').find({},{}).exec(function (err, clients){
        mongoose.model('clients').populate(clients, {path: 'profile'}, function(err, clients) {
            console.log("Sended Array of clients...");
            res.send(clients);
        });
    });
});

router.post('/registerNewClient',function(req,res)
{
    /*Hlavny admin uz si nemusi hashovat heslo*/
    if (req.body['mainAdmin'])
    {
        console.log("SME v mainADmin");
        mongoose.model('clients').findOne({email: req.body['email']}, {}, function (err, user) {
            if (user) {
                user.firstName = req.body['firstName'];
                user.lastName = req.body['lastName'];
                user.sex = req.body['sex'];
                user.date_of_birth = req.body['date'];
                user.roles.push(req.body['role']);
                user.save(function (err) {
                    if (!err) {
                        mongoose.model('confirmations').findOne({_id: req.body['confirmationId']}, {}, function (err, confirmation) {
                            console.log(confirmation);
                            console.log(req.body['confirmationId']);
                            if (confirmation) {
                                confirmation.state = "Prijaté";
                                confirmation.save(function (err) {
                                    if (!err) {
                                        res.send(200);
                                    }
                                })
                            }
                        });
                    }
                });
            }
        });
    }
    else {

        //hashovanie hesla
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body['password'], salt, function (err, hash) {

                mongoose.model('clients').findOne({email: req.body['email']}, {}, function (err, user) {
                    if (user) {
                        user.firstName = req.body['firstName'];
                        user.lastName = req.body['lastName'];
                        user.password = hash;
                        user.verifiedEmail = true;
                        user.sex = req.body['sex'];
                        user.date_of_birth = req.body['date'];
                        user.roles = [req.body['role']];

                        user.save(function (err) {
                            if (!err) {
                                mongoose.model('confirmations').findOne({_id: req.body['confirmationId']}, {}, function (err, confirmation) {
                                    console.log(confirmation);
                                    console.log(req.body['confirmationId']);
                                    if (confirmation) {
                                        confirmation.state = "Prijaté";
                                        confirmation.save(function (err) {
                                            if (!err) {
                                                res.send(200);
                                            }
                                        })
                                    }

                                });
                            }
                        });
                    }
                });

            });
        });
    }
});

router.post('/editPassword',function(req,res) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body['password'], salt, function (err, hash) {
            mongoose.model('clients').findOne({_id: req.body['id']},{},function(err,user)
            {
               user.password = hash;
               user.save(function(err)
               {

                   if (!err)
                   {
                       res.send(200);
                   }
               })
            });

        });
    });
});

router.post('/registerClient',function(req,res)
{
    mongoose.model('clients').findOne({email: req.body['email']},{},function(err,user)
    {
        if (user)
        {
            user.firstName = req.body['firstName'];
            user.lastName = req.body['lastName'];
            user.date_of_birth = req.body['date'];
            user.sex = req.body['sex'];
            user.save(function(err)
            {
                if (!err)
                {
                    res.send(200);
                }
            })
        }
        else
        {
            console.log("Not FOUND");
        }
    });
});

router.post('/acceptRole',function(req,res)
{
    mongoose.model('clients').findOne({_id: req.body['id']},{},function(err,user)
    {
        user.roles.push(req.body['role']);
        user.save(function(err)
        {
            if (!err)
            {
                mongoose.model('confirmations').findOne({_id: req.body['confirmationId']},{},function(err,confirmation)
                {
                    confirmation.state = "Prijaté";
                    confirmation.save(function(err)
                    {
                        if (!err)
                        {
                            res.send(user);
                        }
                    })
                });
            }
        });
    });
});


router.post('/rejectRole',function(req,res)
{
                mongoose.model('confirmations').findOne({_id: req.body['confirmationId']},{},function(err,confirmation)
                {
                    confirmation.state = "Zamietnuté";
                    confirmation.save(function(err)
                    {
                        if (!err)
                        {
                            res.send(200);
                        }
                    })
                });
});


router.get('/getAllAboutUser',function(req,res)
{
    console.log(req.query.id);
    mongoose.model('clients').find({_id:req.query.id},{},function(err,user)
    {
        res.send(user);

    });
});

router.get('/getUser',function(req,res)
{
    console.log(req.query.id);
   mongoose.model('clients').find({_id:req.query.id},{},function(err,user)
   {
          res.send(user[0]);

   });
});

router.post('/editFirstName',function(req,res)
{
    mongoose.model('clients').findOne({_id: req.body['id']},{},function(err,user)
    {
        if (user)
        {
            user.firstName = req.body['firstName'];
            user.save(function(err)
            {
                if (!err)
                {
                    res.send(200);
                }
            })
        }
    });
});

router.post('/editOldPassword',function(req,res)
{
    mongoose.model('clients').findOne({_id: req.body['id']},{},function(err,user)
    {
        if (user)
        {
            bcrypt.compare(req.body['oldPassword'], user.password, function (err, result) {
                if (result) {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(req.body['newPassword'], salt, function (err, hash) {
                            user.password = hash;
                            user.save(function(err)
                            {
                                if (!err)
                                {
                                    res.send({oldPassword:true});
                                }
                            })
                        });
                    });
                }
                else
                {
                    res.send({oldPassword: false});
                }
            });
        }
    });


});
router.post('/editLastName',function(req,res)
{
    mongoose.model('clients').findOne({_id: req.body['id']},{},function(err,user)
    {
        if (user)
        {
            user.lastName = req.body['lastName'];
            user.save(function(err)
            {
                if (!err)
                {
                    res.send(200);
                }
            })
        }
    });
});
router.get('/getUserWithConfirmation',function(req,res)
{
    mongoose.model('confirmations').find({addressedTo: req.query.id, role: req.query.role},{}).exec(function(err,user)
    {
        if (user.length)
        {
            mongoose.model('clients').populate(user, {path: 'addressedTo'},function(err,client)
            {
                res.send(client[0]);
            });
        }
        else
        {
            res.send(404);
        }
    });
});


router.delete('/:id',function(req, res)
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    console.log("DELETE: Object with _id: "+req.params.id);
    return mongoose.model('clients').findByIdAndRemove(req.params.id, function (err,client) {
        /*--Ak vymazanie prebehne bez problemov--*/
        if (!err) {
            /*--Ak je to klient, musime vymazat referencie users,profiles,seats--*/
            if (client.role === 'client')
            {
                /*for (var i=0; i< client.profile.length;i++)
                {
                    mongoose.model('profiles').remove({_id : client.profile[i]._id},{},function(err,profile)
                    {

                    });
                }*/
                res.send(client);
            }
            else
            {
                res.send(client);
            }
        } else {
            console.log(err);
        }
    });
});

module.exports = router;
