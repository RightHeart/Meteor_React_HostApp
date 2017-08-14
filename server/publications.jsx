let optional = Match.Optional;
let integer = Match.Integer;
let { Error } = Meteor;

Meteor.publish('Users.getByResetToken', function(token) {
  const user = Meteor.users.findOne({'services.password.reset.token': token});
  if (!user) return [];
  return Meteor.users.find({_id: user._id}, {fields: {_id: 1}});
});

Meteor.publish('Cards.all', function() {
  return Cards.find({userId: this.userId});
});

Meteor.publish('Orders.byStatus', function(status, filters = {}) {
  // Meteor._sleepForMs(4000);
  check(filters, {
    sort: optional(Object),
    limit: optional(integer),
  });
  return Orders.find({userId: this.userId, status: status}, filters);
});

Meteor.publish('Orders.byId', function(_id) {
  const order = Orders.find({ userId: this.userId, _id });
  const orders = order.fetch();
  let propertyId = orders.length > 0 ? orders[0].propertyId : '';
  const property = Properties.find(
      {userId: this.userId, _id: propertyId});

  return [
    order,
    property,
  ];
});

Meteor.publish('Properties.all', function() {
  return Properties.find({userId: this.userId, removed: {$ne: true}});
});

Meteor.publish('Properties.byId', function(_id) {
  return Properties.find({_id, userId: this.userId, removed: {$ne: true}});
});

Meteor.publish('Products.forProperty', function(_id) {
  check(_id, String);

  const property = Properties.findOne(
    {_id, userId: this.userId, removed: {$ne: true}});
  if (!property) {
    throw new Error('404', `No property found for current user with id ${_id}`);
  }

  let user = Meteor.users.findOne({_id: this.userId});
  let premium = user && !!user.profile.premium;

  const priceList = PriceLists.current();

  const products = Products.find({
    $or: [
      {
        type: ProductType.CLEAN,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        size: property.type,
        premium,
      },
      {
        type: {$ne: ProductType.CLEAN},
        premium: false,
      },
    ],
  });

  const productIds = _.pluck(products.fetch(), '_id');
  const prices = Prices.find({
    priceListId: priceList._id, productId: {$in: productIds} });

  return [
    PriceLists.find({isCurrent: true}),
    prices,
    products,
  ];
});
