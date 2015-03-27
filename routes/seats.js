var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

/* GET seats listing. */
router.get('/', function(req, res) {
  mongoose.model('seats').find({}).sort({order:1}).exec(function (err, seats){
    mongoose.model('seats').populate(seats, {path: 'state'}, function(err, seats) {
      mongoose.model('seats').populate(seats, {path: 'table'}, function (err, seats) {
        mongoose.model('seats').populate(seats, {path: 'part'}, function (err, seats) {
          mongoose.model('seats').populate(seats, {path: 'room'}, function (err, seats) {
            mongoose.model('seats').populate(seats, {path: 'profile'}, function (err, seats) {
              console.log("Seats sent to client...");
              res.send(seats);
            });
          });
        });
      });
    });
  });
});

/* DELETE Seat from DB. */
router.delete('/:id',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("DELETE: Object with _id: "+req.params.id);
  return mongoose.model('seats').findByIdAndRemove(req.params.id, function (err) {
    if (!err) {
      console.log("removed");
      return res.status(200);
    } else {
      console.log(err);
      return res.send(err);
    }
  });
});

/* POST of adding a seat. */
router.post('/add',function(req, res){
    console.log("TABLE ID "+req.body.table._id);
  // Create a new message model, fill it up and save it to Mongodb
  if (req.body.profile !== undefined) { // Ak sme aj vyplnili uzivatela
      console.log("Vyplneny uzivatel");
    // Creating a Profile
    var AddProfileSchema = mongoose.model('profiles');
    var addProfile = new AddProfileSchema(req.body.profile);
    addProfile.save(function (err) {
      if (!err) {
        // Creating a Seat
        var AddSeatSchema = mongoose.model('seats');
        var addedSeatToTable = mongoose.model('tables');
        var addUserSchema = mongoose.model("users");
        var addUser = new addUserSchema();
        var addSeat = new AddSeatSchema();
        // Adding profile_id to the Seat
        addSeat.profile = addProfile._id;
        addSeat.order = req.body.order;
        addSeat.room = req.body.room;
        addSeat.part = req.body.part;
        addSeat.full_name = addProfile.first_name+" "+addProfile.last_name;
        addSeat.below_18 = (addProfile.under_18 === undefined) ? false: true;
        addSeat.table = req.body.table._id;
        addSeat.state = req.body.state;
        console.log("SAVE: Seat Object with state: " + addSeat.state + " to seat order " + addSeat.order);

         return addSeat.save(function (err,seat) {
          if (!err) {

              /*--Pridavanie seats do Tables--*/
              addedSeatToTable.findOneAndUpdate(
                  {_id: req.body.table._id},
                  {$push: {seats: seat._id}},
                  {safe: true, upsert: true},
                  function (err) {
                      if (!err)
                      {
                          /*---------Pridavanie uzivatela do kolekcie Users--------*/
                          addUser.profile = addProfile._id;
                          addUser.seats = seat._id;
                          addUser.save(function(err,user)
                          {
                              if (!err)
                              {
                                  /*---Pridavanie User do Profiles*/
                                  AddProfileSchema.findById(addProfile._id,{},function(err,profile)
                                  {
                                     profile.user = user._id;
                                      profile.save(function(err,user)
                                      {
                                          (!err)? res.send(200):console.log("Error");
                                      });

                                  });
                              }
                          });
                      }
                  }
              );
          } else {
            console.log(err);
            res.send(err);
          }
        });
      } else {
        console.log(err);
        res.send(err);
      }
    });
  } else {
      console.log("Nevyplneny uzivatel");
    // Creating a Seat
    var AddSeatSchema = mongoose.model('seats');
      var addedSeatToTable = mongoose.model('tables');

      var addSeat = new AddSeatSchema();
    // Adding profile_id to the Seat
    addSeat.profile = undefined;
    addSeat.order = req.body.order;
    addSeat.room = req.body.room;
    addSeat.part = req.body.part;
    addSeat.table = req.body.table._id;
    addSeat.state = req.body.state;
    console.log("SAVE: Seat Object with state: " + addSeat.state + " to seat order " + addSeat.order);
     addSeat.save(function (err,seat) {
      if (!err) {

          console.log("TABLE ID "+req.body.table._id);
          console.log("SEAT ID "+seat._id);
          addedSeatToTable.findOneAndUpdate(
              {_id: req.body.table._id},
              {$push: {seats: seat._id}},
              {safe: true, upsert: true},
              function (err) {
                  if (!err) res.send(200);
              }
          );
      } else {
        console.log(err);
        res.send(err);
      }
    });
  }
});

/* POST of modifying seat. */
router.post('/',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  var without = {};
  if (req.body.clean) {
    without = req.body.clean;
  }
  console.log("SAVE: Seat Object with state: "+req.body.state + " to seat order " + req.body.order);
  return mongoose.model('seats').findOne({_id: req.body._id},without, function (err, seat) {
    if (!err) {
      var ProfileSchema = mongoose.model('profiles');
      if ((req.body.profile._id !== undefined)&&(req.body.profile._id !== null)) {
        mongoose.model('profiles').findOne({_id: req.body.profile._id}, function (err, profile) {
          if (!err) {
            profile.first_name = req.body.profile.first_name;
            profile.last_name = req.body.profile.last_name;
            profile.email = req.body.profile.email;
            profile.mobil = req.body.profile.mobil;
            profile.under_18 = req.body.profile.under_18;
            profile.save();
            seat.profile = profile._id;
            seat.state = req.body.state;
            seat.table = req.body.table;
            seat.part = req.body.part;
            seat.room = req.body.room;
            seat.save();
            mongoose.model('tables').findOne({_id: req.body.table}, function (err, table) {
              if (!err) {
                table.seats.push({_id: req.body._id});
                table.save();
                console.log("modified");
                return res.status(200);
              } else {
                console.log(err);
                return res.send(err);
              }
            });
          } else {
            console.log(err);
            return res.send(err);
          }
        });
      } else if (req.body.profile._id !== null) {
        var addProfile = new ProfileSchema(req.body.profile);
        addProfile.save();
        console.log("Profile ID created: " + addProfile._id);
        seat.profile = addProfile._id;
        seat.state = req.body.state;
        seat.table = req.body.table;
        seat.part = req.body.part;
        seat.room = req.body.room;
        console.log("Profile ID added to Seat: " + seat.profile);
        seat.save();
        mongoose.model('tables').findOne({_id: req.body.table}, function (err, table) {
          if (!err) {
            table.seats.push({_id: req.body._id});
            table.save();
            console.log("modified");
            return res.status(200);
          } else {
            console.log(err);
            return res.send(err);
          }
        });
      } else {
        seat.profile = undefined;
        seat.state = req.body.state;
        seat.table = req.body.table;
        seat.part = req.body.part;
        seat.room = req.body.room;
        console.log("Profile ID added to Seat: " + seat.profile);
        seat.save();
        mongoose.model('tables').findOne({_id: req.body.table}, function (err, table) {
          if (!err) {
            table.seats.push({_id: req.body._id});
            table.save();
            console.log("modified");
            return res.status(200);
          } else {
            console.log(err);
            return res.send(err);
          }
        });
      }
    }
  });
});

/* GET seats and export them to a file. */
router.get('/write', function(req, res) {
  mongoose.model('seats').find({}).sort({order:1}).exec(function (err, seats){
    mongoose.model('seats').populate(seats, {path: 'state'}, function(err, seats) {
      mongoose.model('seats').populate(seats, {path: 'table'}, function(err, seats) {
        mongoose.model('seats').populate(seats, {path: 'profile'}, function(err, seats) {
          var outputFilename = "data/seats_out.json";

          fs.writeFileSync(outputFilename, JSON.stringify(seats, null, '\t'));
          console.log("JSON saved to " + outputFilename);

          res.send(seats);
        });
      });
    });
  });
});

module.exports = router;
