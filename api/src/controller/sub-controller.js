const subscriptionModel = require('../models/subscription')

 exports.create = (req, res, next) => {
    subscriptionModel.create({
      name: req.body.name, 
      duration: req.body.duration,
      price: req.body.price
    }, function(err, result) {
      if (err)
        next (err);
        else res.json({status: "success", message: "Subscription added successfully", data: null});
    });
  }