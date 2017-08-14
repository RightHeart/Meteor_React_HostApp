let { Error, isServer, isClient, wrapAsync, users } = Meteor;

function saveCardDetails(card, defaultCard) {
  Cards.insert({
    cardId: card.id,
    brand: card.brand,
    expMonth: card.exp_month,
    expYear: card.exp_year,
    last4: card.last4,
    fingerprint: card.fingerprint,
    isDefault: defaultCard,
  });
}

Meteor.methods({

  'Card.add'(token) {
    check(token, String);
    const user = Meteor.user();
    const defaultCard = Cards.find({userId: user._id}).count() === 0;

    if (isServer) {
      // does the user have a stripe customer id?
      if (user.stripeId) {
        // just save the card
        let rtn = Async.runSync(done => {
          Stripe.customers.createCard(user.stripeId, {
            source: token,
          }, done);
        });
        if (!!rtn.error) {
          throw new Error(402, rtn.error.message);
        }
        saveCardDetails(rtn.result, defaultCard);
      } else {
        // create a customer first
        let rtn = Async.runSync(done => {
          Stripe.customers.create({
            source: token,
          }, done);
        });
        if (!!rtn.error) {
          throw new Error(402, rtn.error.message);
        }
        users.update(user._id, {$set: { stripeId: rtn.result.id}});
        saveCardDetails(rtn.result.sources.data[0], defaultCard);
      }
    }
  },

  'Card.setDefault'(_id) {
    check(_id, String);
    let { userId } = this;
    const card = Cards.findOne({_id, userId});

    if (card) {
      card.setDefault();
    }
  },

  'Card.remove'(_id) {
    check(_id, String);
    let { userId } = this;
    const card = Cards.findOne({_id, userId});
    const user = Meteor.user();
    const count = Cards.find({userId}).count();

    if (!card) {
      throw new Error(
        403, 'You can\'t remove someone else\'s card. How did you do that?');
    }

    if (count <= 1) {
      throw new Error(400, 'You must have one file on your account.');
    }

    if (isClient) {
      return Cards.remove(_id);
    }

    if (isServer) {
      const removeCard =
        wrapAsync(Stripe.customers.deleteCard, Stripe.customers);
      const cardRemoved = removeCard(user.stripeId, card.cardId);
      if (cardRemoved) {
        return Cards.remove(_id);
      }
      throw new Error(400, 'Card not removed, please try again.');
    }
  },

  'Card.update'(_id, data) {
    check(_id, String);
    check(data, {
      expMonth: Number,
      expYear: Number,
    });
    let { userId } = this;
    const card = Cards.findOne({_id, userId});
    const user = Meteor.user();

    if (!card) {
      throw new Error(
        403, 'You can\'t update someone else\'s card. How did you do that?');
    }

    if (isClient) {
      return Cards.update(_id, {$set: data});
    }

    if (isServer) {
      const updateCard =
        wrapAsync(Stripe.customers.updateCard, Stripe.customers);
      const cardUpdated = updateCard(user.stripeId, card.cardId, {
        exp_month: data.expMonth,
        exp_year: data.expYear,
      });
      if (cardUpdated) {
        return Cards.update(_id, {$set: data});
      }
      throw new Error(400, 'Card not updated, please try again.');
    }
  },
});
