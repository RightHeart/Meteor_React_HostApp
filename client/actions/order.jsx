OrderActions = {
  handleCancelOrder(_id, cb = () => {}) {
    Meteor.call('Order.cancel', _id, cb);
  },
  handleCreateOrder(options, qtys, discountId, cb = () => {}) {
    Meteor.call('Order.create', options, qtys, discountId, cb);
  },
};
