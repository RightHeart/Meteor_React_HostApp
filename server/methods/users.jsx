
let { Error, settings } = Meteor;

Meteor.methods({
  'User.requestPasswordReset'(email) {
    check(email, String);

    const user = Meteor.users.findOne({'emails.address': email});
    if (!user) {
      throw new Error(404,
        'Can\'t find user with email address ' + email);
    }
    const token = Random.secret();
    const when = new Date();
    const tokenRecord = {
      token: token,
      email: email,
      when: when,
    };
    Meteor.users.update(user._id, {$set: {
      'services.password.reset': tokenRecord,
    }});
    // before passing to template, update user object with new token
    Meteor._ensure(user, 'services', 'password').reset = tokenRecord;

    const resetUrl =
      Meteor.absoluteUrl('reset-password/' + token, {secure: true});

    Emailer.send('85056', email, 'Reset Password', {
      resetUrl,
    });
  },
  'User.data'() {
    const user = Meteor.user();
    const propertyCount = Properties.find(
      {userId: user._id, removed: { $ne: true }}).count();
    const completeCount = Orders.find({
      userId: user._id,
      status: OrderStatus.COMPLETE}).count();

    const upcomingOrders =
      Orders.find({
        userId: user._id,
        $or: [{status: OrderStatus.ORDERED}, {status: OrderStatus.ASSIGNED}],
      }, {sort: {serviceDate: 1}});
    const upcomingOrdersCount = upcomingOrders.count();
    let nextBooking = null;
    if (upcomingOrdersCount > 0) {
      nextBooking =
        moment(upcomingOrders.fetch()[0].serviceDate).utc().format('YY/MM/DD');
    }

    return {
      user_id: user._id,
      user_hash: CryptoJS.HmacSHA256(
        user._id, settings.intercomKey).toString(),
      created_at: Number(moment(user.createdAt).utc().format('X')),
      email: !user.profile.guest ? user.emails[0].address : null,
      name: !user.profile.guest ? user.profile.fullName : 'Guest User',
      'Phone': user.profile.phone,
      'Property Count': propertyCount,
      'New Bookings': upcomingOrdersCount,
      'Next Booking': !!nextBooking ? Number(nextBooking) : null,
      'Complete Bookings': completeCount,
      'Kayla Black': user.profile.premium,
    };
  },
});
