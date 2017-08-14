
Meteor.methods({
  'Property.tookanSync'(propertyId) {
    const orders = Orders.find({ propertyId: propertyId, $or: [{ status: 'ordered' }, { status: 'assigned' }] }, {fields: {_id: 1}});
    orders.forEach(function(order) {
      Meteor.call('Order.tookanSync', order._id);
    }, this);
  }
});