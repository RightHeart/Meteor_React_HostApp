PropertyActions = {
  handleAddNew(address, bedrooms, bathrooms, nickname, cb = () => {}) {
    Meteor.call('Property.add', {address, bedrooms, bathrooms, nickname}, cb);
  },
  handleLocationUpdate(_id, options, cb = () => {}) {
    Meteor.call('Property.updateLocation', _id, options, cb);
  },
  handleConfigurationUpdate(_id, options, cb = () => {}) {
    Meteor.call('Property.updateConfiguration', _id, options, cb);
  },
  handleInstructionsUpdate(_id, options, cb =() => {}) {
    Meteor.call('Property.updateInstructions', _id, options, cb);
  },
  handlePropertyRemoval(_id, cb = () => {}) {
    Meteor.call('Property.remove', _id, cb);
  },
};
