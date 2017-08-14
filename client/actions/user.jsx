let settings = Meteor.settings.public;

UserActions = {

  handleInfoUpdate(data, cb = () => {}) {
    Meteor.call('User.updateInfo', data, cb);
  },

  handlePasswordChange(data, cb = () => {}) {
    Accounts.changePassword(data.password, data.newPassword, cb);
  },

  handleLogin(data, cb = () => {}) {
    Meteor.loginWithPassword(data.email, data.password, cb);
  },

  handleRegister(data, cb = () => {}) {
    let {email, password, name, phone} = data;
    Accounts.createUser(
      {email, password, profile: {fullName: name, phone}}, cb);
  },

  handleGuestLogin() {
    Meteor.call('User.createGuest', (err, user) => {
      if (!err) {
        Meteor.loginWithPassword(user.email, user.password);
      }
    });
  },

  handleConvertGuest(data, cb = () => {}) {
    Meteor.call('User.convertGuest', data, cb);
  },

  handleSignOut() {
    Meteor.logout();
    IntercomActions.shutdown();
  },

  handlePasswordRequest(email, cb = () => {}) {
    Meteor.call('User.requestPasswordReset', email, cb);
  },

  handleResetPassword(token, password, cb = () => {}) {
    Accounts.resetPassword(token, password, cb);
  },

  handlePremiumFlag(premium, cb = () => {}) {
    Meteor.call('User.setPremium', premium, cb);
  },

  handleNotificationSetting(key, value, cb = () => {}) {
    Meteor.call('User.setNotification', key, value, cb);
  },
};
