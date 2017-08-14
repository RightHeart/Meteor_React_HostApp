
const _auth = FlowRouter.group({
  triggersEnter: [
    (ctx, redirect) => {
      // If we're already logged in then redirect.
      if (Meteor.loggingIn() || Meteor.userId()) {
        const url = Session.get('redirectAfterLogin') || '/';
        redirect(url);
      }
    },
  ]});
_auth.key = '_auth';

_auth.route('/sign-in', {
  name: 'signIn',
  action() {
    ReactLayout.render(Public, { content() { return <SignIn />; }});
  },
});

_auth.route('/sign-up', {
  name: 'signUp',
  action (params, queryParams) {
    FlowRouter.withReplaceState(function() {
      // prevent users copy and pasting URL with email in it
      FlowRouter.setQueryParams({email: null});
    });
    ReactLayout.render(Public, { content() { return <SignUp prefilledEmail={queryParams.email} />; }});
  },
});

_auth.route('/sign-up-mk', {
  name: 'signUp',
  action (params, queryParams) {
    FlowRouter.withReplaceState(function() {
      // prevent users copy and pasting URL with email in it
      FlowRouter.setQueryParams({email: null});
    });
    ReactLayout.render(Public, { content() { return <SignUpMK prefilledEmail={queryParams.email} />; }});
  },
});

_auth.route('/forgot-password', {
  name: 'forgotPassword',
  action() {
    ReactLayout.render(Public, { content() { return <ForgotPassword />; }});
  },
});

_auth.route('/reset-password/:token', {
  name: 'resetPassword',
  action(params) {
    ReactLayout.render(Public, { content() {
      return <ResetPassword {...params} />;
    }});
  },
});

const _app = FlowRouter.group({
  triggersEnter: [
    (ctx, redirect) => {
      if (!(Meteor.loggingIn() || Meteor.userId())) {
        Session.set('redirectAfterLogin', ctx.path);
        redirect(FlowRouter.path('signIn'));
      }
    },
  ],
});

_app.route('/', {
  name: 'properties',
  action() {
    ReactLayout.render(App, { content: PropertiesPage });
  },
});

_app.route('/property/:propertyId', {
  name: 'propertyConfiguration',
  action(params) {
    params.contentElement = PropertyConfiguration;
    ReactLayout.render(App, { content: PropertyPages, contentProps: params });
  },
});

_app.route('/property/:propertyId/location', {
  name: 'propertyLocation',
  action(params) {
    params.contentElement = PropertyLocation;
    ReactLayout.render(App, { content: PropertyPages, contentProps: params });
  },
});

_app.route('/property/:propertyId/instructions', {
  name: 'propertyInstructions',
  action(params) {
    params.contentElement = PropertyInstructions;
    ReactLayout.render(App, { content: PropertyPages, contentProps: params });
  },
});

_app.route('/invoices/:limit?', {
  name: 'invoices',
  action(params) {
    const props = {};
    let limit = Number(params.limit);
    if (limit) props.limit = limit;
    ReactLayout.render(App, { content: Invoices, contentProps: props });
  },
});

_app.route('/payment', {
  name: 'payment',
  action() {
    ReactLayout.render(App, { content: Payment });
  },
});

_app.route('/account', {
  name: 'account',
  action() {
    ReactLayout.render(App, { content: Account });
  },
});

_app.route('/support', {
  name: 'support',
  action() {
    ReactLayout.render(App, { content: SupportPage });
  },
});

FlowRouter.triggers.enter([
  context => {
    setTimeout(() => {
      GAnalytics.pageview(context.path);
      fbq && fbq('track', "PageView");
    }, 400);
  },
]);
