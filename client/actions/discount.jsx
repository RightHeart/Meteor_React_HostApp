DiscountActions = {
  handleAddingPromoCode(code, cb = () => {}) {
    Meteor.call('Discounts.getFromPromoCode', code, cb);
  },
};
