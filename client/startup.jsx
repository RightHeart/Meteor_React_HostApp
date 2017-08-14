
Meteor.startup(() => {
  outdatedBrowser({
      bgColor: '#f25648',
      color: '#ffffff',
      lowerThan: 'IE11',
      languagePath: '/outdatedbrowser/lang/en.html',
  });

  injectTapEventPlugin();

  SimpleSchema.messages({
    passwordMismatch: 'Passwords do not match',
    wrongPassword: 'Incorrect password',
    wrongEmail: 'User not found',
    invalidCardNumber: 'Must be a valid card number',
    invalidExpiryDate: 'Expiry must be a future date',
    invalidCVC: 'Must be a valid CVC',
  });

  GoogleMaps.load(['places'], Meteor.settings.public.googleAPIKey);

  Stripe.setPublishableKey(Meteor.settings.public.stripePublishableKey);

  Accounts.onLogin(() => {
    const currentRoute = FlowRouter.current();
    let { key } = currentRoute.route.group;
    if (key === '_auth') {
      const url = Session.get('redirectAfterLogin') || '/';
      Session.set('redirectAfterLogin', null);
      FlowRouter.go(url);
    }
  });

  Tracker.autorun(function() {
    const currentRoute = FlowRouter.current();
    let { key } = currentRoute.route.group;
    if (!Meteor.userId() && key !== '_auth') {
      Session.set('redirectAfterLogin', currentRoute.path);
      FlowRouter.go(FlowRouter.path('signIn'));
    }
  });

  Tracker.autorun(function() {
    let user = Meteor.user();
    if (user) {
      IntercomActions.boot();
    }
  });
});
