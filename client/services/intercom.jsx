let settings = Meteor.settings.public;

IntercomActions = {
  update(func = 'update') {
    Meteor.call('User.data', (err, data) => {
      if (data) {
        Intercom(func, _.extend({app_id: settings.intercomAppID}, data));
      }
    });
  },
  boot() {
    if (!!Intercom) {
      this.update('boot');
    } else {
      setTimeout(this.boot.bind(this), 250);
    }
  },
  shutdown() {
    Intercom('shutdown');
  },
  trackEvent(name, data) {
    Intercom('trackEvent', name, data);
  },
};