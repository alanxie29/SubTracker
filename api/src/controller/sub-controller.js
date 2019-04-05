const Subscription = require("../models/subscription");

exports.createSubscription = (req, res) => {
  if (!req.body.name || !req.body.duration || !req.body.price)
    return res.status(400).json({ msg: "Missing Fields" });

  let newSubscription = Subscription(req.body);
  newSubscription.save((err, sub) => {
    if (err) {
      return res.status(400).json({ msg: console.err });
    }
    return res.status(201).json(sub);
  });
};

exports.deleteById = (req, res) => {
  Subscription.findOneAndDelete(req.params.subscriptionId, function(err) {
    if (err) {
      return res.status(204).json({ msg: `Subscription not found, ${err}` });
    } else {
      res.status(200).json({ msg: "success, Subscription deleted successfully" });
    };
  });
};

exports.updateById = (req, res) => {
  Subscription.findOneAndUpdate(req.params.subscriptionId, {
    name: req.body.name,
    duration: req.body.duration,
    price: req.body.price
  }, function(err) {
    if (err) {
      return res.status(204).json({ msg: `Suscription not found, ${err}` });
    } else {
      res.status(200).json({ msg: "success, Subscription updated successfully" });
    };
  });
};

exports.getAllSubscriptions = (req, res) => {
  let subscriptionsList = [];

  Subscription.find({}, function (err, subscriptions) {
    if (err) {
      res.status(204).json({ msg: `error finding Subscriptions, ${err}`});
    } else {
      for (let subscription of subscriptions) {
        subscriptionsList.push({
          id: subscription.id, 
          name: subscription.name,
          duration: subscription.duration,
          price: subscription.price });
      }
      res.status(200).json({subscriptions: subscriptionsList});
    };
  });
};
