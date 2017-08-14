CardActions = {
  addCreditCard(card, cb = () => {}) {
    Stripe.card.createToken(card, (status, res) => {
      if (res.error) {
        cb(res.error);
      } else {
        Meteor.call('Card.add', res.id, cb);
      }
    });
  },
  removeCreditCard(_id, cb = () => {}) {
    Meteor.call('Card.remove', _id, cb);
  },
  setDefaultCard(_id, cb = () => {}) {
    Meteor.call('Card.setDefault', _id, cb);
  },
  updateCreditCard(_id, data, cb = () => {}) {
    Meteor.call('Card.update', _id, data, cb);
  },
};
