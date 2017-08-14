Meteor.methods({
  'Discounts.getFromPromoCode'(code) {
    check(code, String);
    const discount = Discounts.findOne({code, hasExpired: false});
    if (!Meteor.call('Discounts._validate', discount)) return null;
    return discount;
  },

  'Discounts._validate'(discount) {
    // Do we have a discount?
    if (!discount) return false;

    // Double check that the discount has not expired
    if (discount.hasExpired) return false;

    // Has this user used this code before?
    if (discount.isMulti) {
      const user = Meteor.user();
      const used = user.usedDiscounts || [];

      if (_.contains(used, discount._id)) {
        return false;
      }
    }

    // Do we have a start date?
    if (!_.isUndefined(discount.startDate)) {
      const sd = moment(discount.startDate).tz('Australia/Sydney');
      const now = moment(new Date()).tz('Australia/Sydney');
      if (now.isBefore(sd)) return false;
    }

    // Do we have a end date?
    if (!_.isUndefined(discount.endDate)) {
      const ed = moment(discount.endDate).tz('Australia/Sydney');
      const now = moment(new Date()).tz('Australia/Sydney');
      if (now.isAfter(ed)) return false;
    }

    // We passed all tests
    return true;
  },
});
