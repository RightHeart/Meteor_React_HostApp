Meteor.methods({
  'Location.isServiceable'(sub, code) {
    const suburb = new RegExp('^' + sub + '$', 'i');
    const postcode = new RegExp('^' + code + '$', 'i');
    return Locations.find({suburb, postcode, isServiceable: true}).count() > 0;
  },
});
