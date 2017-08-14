let optional = Match.Optional;

Meteor.methods({
  'Property.add'(options) {
    check(options, {
      address: Object,
      bedrooms: Number,
      bathrooms: Number,
      nickname: String,
    });
    check(options.address, {
      street: String,
      suburb: String,
      postcode: String,
      state: optional(String),
      lat: Number,
      lng: Number,
    });

    let {address, bedrooms, bathrooms, nickname} = options;
    let {street, suburb, postcode, state, lat, lng} = address;

    return Properties.insert({
      type: PropertyType.APARTMENT,
      bedrooms,
      bathrooms,
      nickname,
      street,
      suburb,
      state,
      postcode,
      loc: {
        coordinates: [lng, lat],
      },
    });
  },

  'Property.updateLocation'(_id, options) {
    check(_id, String);
    check(options, {
      street: String,
      suburb: String,
      postcode: String,
      state: optional(String),
      lng: Number,
      lat: Number,
    });

    let { street, suburb, postcode, state, lng, lat } = options;

    Properties.update({_id, userId: this.userId}, {$set: {
      street,
      suburb,
      postcode,
      state,
      loc: {
        coordinates: [lng, lat],
      },
    }}, {validate: false});
  },

  'Property.updateConfiguration'(_id, options) {
    check(_id, String);
    check(options, {
      nickname: String,
      type: String,
      bedrooms: Number,
      bathrooms: Number,
      king: Number,
      queen: Number,
      single: Number,
      hasVacuum: Boolean,
      hasMopBucket: Boolean,
      link: String,
    });
    Properties.update({_id, userId: this.userId}, {$set: options});
  },
  'Property.updateInstructions'(_id, options) {
    check(_id, String);
    check(options, {
      access: optional(String),
      parking: optional(String),
      rubbish: optional(String),
      extra: optional(String),
    });

    if (!!options.access) {
      options.accessRead = false;
    }
    if (!!options.parking) {
      options.parkingRead = false;
    }
    if (!!options.rubbish) {
      options.rubbishRead = false;
    }
    if (!!options.extra) {
      options.extraRead = false;
    }

    Properties.update({_id, userId: this.userId},
      {$set: options}, {validate: false});

    Meteor.call('Property.tookanSync', _id);
  },
  'Property.remove'(_id) {
    check(_id, String);

    // Cancel all upcoming bookings first
    const upcoming = Orders.find(
      {
        userId: this.userId, propertyId: _id,
        status: {$nin: [OrderStatus.CANCELED, OrderStatus.COMPLETE]},
      }, {fields: {_id: 1}}).fetch();

    for (let order of upcoming) {
      Meteor.call('Order.cancel', order._id);
    }
    Properties.update({_id, userId: this.userId}, {$set: {removed: true}});
  },
});
