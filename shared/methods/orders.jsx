let { Error } = Meteor;

Meteor.methods({
  'Order.cancel'(_id) {
    check(_id, String);

    const user = Meteor.user();
    const order = Orders.findOne({_id, userId: user._id});

    if (!order) throw new Error(404, 'Cannot cancel order: order not found.');

    Orders.update({_id, userId: user._id},
      {$set: {status: OrderStatus.CANCELED}});

    Meteor.call('Order.cancelNotification', order);
    Meteor.call('Order.tookanRemove', order._id);
  },
  'Order.timeSlotString'(ts) {
    if (ts === TimeSlot.AM) return '7:00am - 1:00pm';
    if (ts === TimeSlot.PM) return '1:00pm - 7:00pm';
    if (ts === TimeSlot.WINDOW) return '10:00am - 3:00pm';
    return '7:00am - 7:00pm';
  },
});
