const Subscription = require("../models/subscription");
const User = require("../models/user");

exports.createSubscription = (req, res) => {
  if (
    !req.body.name ||
    !req.body.renewalPeriod ||
    !req.body.price ||
    !req.body.description ||
    !req.body.startDate
  )
    return res.status(400).json({ msg: "Missing Fields" });
  let newSubscription = Subscription(req.body);
  User.findOneAndUpdate(
    { _id: req.params.userId },
    {
      $push: {
        subscriptions: newSubscription
      }
    },
    { new: true },
    function(err, user) {
      if (err) {
        return res
          .status(400)
          .json({ msg: `error adding subscription, ${err}` });
      } else {
        res
          .status(202)
          .json({ msg: "success, subscription added successfully", user });
      }
    }
  );
};

exports.deleteById = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    {
      $pull: {
        subscriptions: {
          _id: req.params.subscriptionId
        }
      }
    },
    { new: true },
    function(err, user) {
      if (err) {
        return res
          .status(400)
          .json({ msg: `error deleting subscription, ${err}` });
      } else {
        res
          .status(202)
          .json({ msg: "subscription deleted successfully", user });
      }
    }
  );
};

exports.updateById = (req, res) => {
  let newSubscription = Subscription(req.body);
  User.findOneAndUpdate(
    { _id: req.params.userId },
    {
      $set: {
        subscriptions:{
          _id: req.params.subscriptionId,
          newSubscription
        } 
      }
    },
    { new: true },
    function(err, user) {
      if (err) {
        return res
          .status(204)
          .json({ msg: `error updating subscription, ${err}` });
      } else {
        res
          .status(200)
          .json({ msg: "success, Subscription updated successfully",user });
      }
    }
  );
};
