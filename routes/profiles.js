var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

/* GET User's profile listing. */
router.get('/', function(req, res) {
  mongoose.model('profiles').find({}).sort({last_name:1}).exec(function (err, profiles){
    mongoose.model('profiles').populate(profiles, {path: 'user'}, function (err, profiles) {
      res.send(profiles);
    });
  });
});

/* DELETE User profile from DB. */
router.delete('/:id',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("DELETE: Object with _id: "+req.params.id);
  return mongoose.model('profiles').findByIdAndRemove(req.params.id, function (err) {
    if (!err) {
      console.log("removed");
      return res.status(200);
    } else {
      console.log(err);
      return res.send(err);
    }
  });
});


/* POST of adding a User profile. */
router.post('/add',function(req, res) {

    var AddProfileSchema = mongoose.model('profiles');
    var clientsSchema = mongoose.model('clients');
    var usersSchema = mongoose.model("users");

    /*--Hladame podla statusu sedadla--*/
    mongoose.model('states').findById(req.body['state'], {}, function (err, state) {
        /*--Ak je volne sedadlo--*/
        if (state.color === "grey") {
            /*Ulozime uzivatela do kolekcie Profiles*/
            var addProfile = new AddProfileSchema(
                {
                    first_name: req.body['first_name'],
                    last_name: req.body['last_name'],
                    under_18: req.body['under_18'],
                    email: req.body['email'],
                    mobil: req.body['mobil']
                }
            );
            addProfile.save(function (err, userProfile) {
                if (!err) {

                    /*--Priradime uzivatela do kolekcie Users--*/
                    var addUser = new usersSchema();
                    addUser.profile = userProfile._id;
                    addUser.seats = req.body['seatId'];
                    addUser.save(function (err, addedUser) {
                            /*--Pridame do Profiles referenciu na Users--*/
                            mongoose.model("profiles").findById(userProfile._id, {}, function (err, user) {
                                    user.user = addedUser._id;
                                    user.save(function(err)
                                    {
                                       if (err) console.log("error");
                                    });
                                }
                            );
                        }
                    );

                    /*Ziskame ID rezervovaneho statusu a pridelime k sedadlu*/
                    mongoose.model('states').find({color: "yellow"}, function (err, state) {
                        /*--Pridelime daneho uzivatela k sedadlu a zmenime status sedadla--*/
                        mongoose.model('seats').findById(req.body['seatId'], {}, function (err, seat) {
                            seat.profile = userProfile._id;
                            seat.full_name = userProfile.first_name + " " + userProfile.last_name;
                            seat.below_18 = userProfile.under_18;
                            seat.state = state[0]._id;
                            seat.save(function(err)
                            {
                                /*--Priradime uzivatela k danemu klientovi--*/
                                clientsSchema.findOneAndUpdate(
                                    {email: req.body['clientEmail'],roles: 'client'},
                                    {$push: {profile: userProfile._id}},
                                    {safe: true, upsert: true},
                                    function (err) {
                                        if (!err) res.send(200);
                                    }
                                );
                            });
                        });
                    });

                }
            });
        }
        /*--Ak je rezervovane sedadlo--*/
        else if (state.color === "yellow") {

        }
    });
});
  /*console.log("SAVE: User profile Object with email: "+addedUserProfile.email);
  return addedUserProfile.save(function (err) {
    if (!err) {
      res.send(addedUserProfile);
    } else {
      console.log(err);
      res.send(err);
    }
  });*/


/* POST of modifying User profile. */
router.post('/',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("SAVE: User profile Object with email: "+req.body.email);
  return mongoose.model('profiles').findOne({_id: req.body._id}, function (err, profile) {
    if (!err) {
      if (req.body.user._id) { profile.user = req.body.user._id; }
      profile.first_name = req.body.first_name;
      profile.last_name = req.body.last_name;
      profile.email = req.body.email;
      profile.mobil = req.body.mobil;
      profile.save();
      console.log("modified");
      return res.status(200);
    } else {
      console.log(err);
      return res.send(err);
    }
  });
});

/* GET User's profiles and export them to a file. */
router.get('/write', function(req, res) {
  mongoose.model('profiles').find({}).sort({last_name:1}).exec(function (err, profiles){
    mongoose.model('profiles').populate(profiles, {path: 'user'}, function (err, profiles) {
      var outputFilename = "data/profiles_out.json";

      fs.writeFileSync(outputFilename, JSON.stringify(profiles, null, '\t'));
      console.log("JSON saved to " + outputFilename);

      res.send(profiles);
    });
  });
});

module.exports = router;
