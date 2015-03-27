var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

/* GET addresses listing. */
router.get('/', function(req, res) {
  mongoose.model('address').find({}).sort({last_name:1}).exec(function (err, address){
    res.send(address);
  });
});

/* DELETE address from DB. */
router.delete('/:id',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("DELETE: Object with _id: "+req.params.id);
  return mongoose.model('address').findByIdAndRemove(req.params.id, function (err) {
    if (!err) {
      console.log("removed");
      return res.status(200);
    } else {
      console.log(err);
      return res.send(err);
    }
  });
});

/* POST of adding an Address. */
router.post('/add',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  var AddAddressSchema = mongoose.model('address');
  var addAddress = new AddAddressSchema(req.body);

  console.log("SAVE: Address Object with city: "+addAddress.city);
  return addAddress.save(function (err) {
    if (!err) {
      res.status(200);
    } else {
      console.log(err);
      res.send(err);
    }
  });
});

/* POST of modifying Address. */
router.post('/',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  // Create a new message model, fill it up and save it to Mongodb
  console.log("SAVE: Address Object with city: "+req.body.city);
  return mongoose.model('address').findOne({_id: req.body._id}, function (err, address) {
    if (!err) {
      if (req.body.state) { address.state = req.body.state; }
      if (req.body.country) { address.country = req.body.country; }
      address.street = req.body.street;
      address.num = req.body.num;
      address.zip = req.body.zip;
      address.city = req.body.city;
      address.save();
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
  mongoose.model('address').find({}).sort({city:1}).exec(function (err, address){
      var outputFilename = "data/address_out.json";

      fs.writeFileSync(outputFilename, JSON.stringify(address, null, '\t'));
      console.log("JSON saved to " + outputFilename);

      res.send(address);

  });
});

module.exports = router;
