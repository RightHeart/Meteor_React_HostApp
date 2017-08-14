let { settings } = Meteor;

let stripAPI = StripeAPI;

if (settings.basicAuth) {
  new HttpBasicAuth(
    settings.basicAuth.username,
    settings.basicAuth.password).protect();
}

Meteor.startup(() => {
  Stripe = stripAPI(Meteor.settings.stripeAPIKey);

  Accounts.onCreateUser((options, user) => {
    user.lastSignIn = new Date;

    if (options.profile) {
      user.profile = options.profile;
    }
    return user;
  });

  Accounts.onLogin((login) => {
    if (login.user) {
      Meteor.users.update(login.user._id,
        {$set: {lastSignIn: new Date}});
    }
  });
});
