LocationActions = {
  isServiceable(suburb, postcode, cb = () => {}) {
    Meteor.call('Location.isServiceable', suburb, postcode, cb);
  },
};
