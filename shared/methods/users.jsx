let optional = Match.Optional;
let oneOf = Match.OneOf;
let { Error } = Meteor;

Meteor.users.deny({
  update() {
    return true;
  },
});

Meteor.methods({

  'User.updateInfo'(data) {
    check(data, {
      name: optional(String),
      email: String,
      phone: String,
    });

    Meteor.users.update(this.userId,
      {$set: {
        'profile.fullName': data.name,
        'emails.0.address': data.email,
        'profile.phone': data.phone,
      }});
  },
  'User.createGuest'() {
    const fake = Fake.user({
      fields: ['email'],
    });

    const guest = {
      email: fake.email,
      password: Meteor.uuid(),
      profile: { guest: true },
    };
    Accounts.createUser(guest);

    return guest;
  },
  'User.convertGuest'(data) {
    check(data, {
      name: oneOf(null, undefined, String),
      phone: oneOf(null, undefined, String),
      email: String,
      password: String,
      confirmPassword: String,
    });
    let {name, phone, email, password} = data;

    if (Meteor.isServer) {
      // check for duplicate without updating reactivity
      const collection =  Meteor.users.rawCollection();
      const sync = Meteor.wrapAsync(collection.findOne, collection);

      const user = sync({'emails.0.address': email});
      if (user) {
        throw new Error('duplicate',
          'There is already a user with that email address.');
      }
    }

    Meteor.users.update(this.userId,
      {$set:
      {'emails.0.address': email, 'profile.guest': false,
        'profile.fullName': name, 'profile.phone': phone}});
    if (Meteor.isServer) {
      Accounts.setPassword(this.userId, password, {logout: false});
    }
  },
  'User.setPremium'(premium) {
    check(premium, Boolean);
    Meteor.users.update(this.userId, {$set: {'profile.premium': premium}});
  },
  'User.setNotification'(key, value) {
    check(key, String);
    check(value, Boolean);

    const user = Meteor.user();
    if (user.profile && user.profile.notifications) {
      Meteor.users.update(this.userId, {$set: {[`profile.notifications.${key}`]: value}});
    } else {
      const notifications = {
        newBooking: true,
        canceledBooking: true,
        housekeeperAssigned: true,
        bookingComplete: true,
      }
      notifications[key] = value;
      Meteor.users.update(this.userId, {$set: {'profile.notifications': notifications}});
    }
  }
});
