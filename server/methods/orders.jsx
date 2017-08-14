let { setTimeout, settings } = Meteor;
let optional = Match.Optional;

const DEFAULT_NOTIFICATIONS = {
  newBooking: true,
  canceledBooking: true,
  housekeeperAssigned: true,
  bookingComplete: true,
}

Meteor.methods({
  'Order.create': function(options, qtys, discountId) {
    check(options, {
      cardId: String,
      propertyId: String,
      serviceDate: Date,
      timeSlot: String,
      comments: optional(String),
    });
    check(qtys, {
      kingQty: Number,
      queenQty: Number,
      singleQty: Number,
      bathQty: Number,
      towelsQty: Number,
      toiletryQty: Number,
    });
    const user = Meteor.user();
    const card = Cards.findOne({userId: user._id, _id: options.cardId});
    const property = Properties.findOne(
      {_id: options.propertyId, userId: user._id});

    let {bedrooms, bathrooms, type,
          nickname, street, suburb, postcode} = property;
    const cleanProduct = Products.findOne({
      type: ProductType.CLEAN,
      bedrooms,
      bathrooms,
      size: type,
      premium: !!user.profile.premium,
    });
    const kingProduct = Products.findOne({
      type: ProductType.BED_LINEN,
      size: BedLinenSize.KING,
      premium: false,
    });
    const queenProduct = Products.findOne({
      type: ProductType.BED_LINEN,
      size: BedLinenSize.QUEEN,
      premium: false,
    });
    const singleProduct = Products.findOne({
      type: ProductType.BED_LINEN,
      size: BedLinenSize.SINGLE,
      premium: false,
    });
    const bathProduct = Products.findOne({
      type: ProductType.BATH_LINEN,
      size: BathLinenSize.BATH,
      premium: false,
    });
    const towelProduct = Products.findOne({
      type: ProductType.BATH_LINEN,
      size: BathLinenSize.TOWELS,
      premium: false,
    });
    const toiletriesProduct = Products.findOne({
      type: ProductType.TOILETRIES,
      premium: false,
    });

    const surchargeProduct = Products.findOne({
      type: ProductType.EXTRAS,
      code: 'KDSURC',
      premium: false,
    });

    const timeSlotDiscount = Products.findOne({
      type: ProductType.EXTRAS,
      code: 'KDTIME',
      premium: false,
    });

    let { propertyId, serviceDate, timeSlot, comments } = options;
    let order = {
      propertyId,
      serviceDate: moment(serviceDate)
        .tz('Australia/Sydney')
        .startOf('day').toDate(),
      timeSlot,
      userStripeId: user.stripeId,
      cardStripeId: card.cardId,
      comments,
      items: [],
    };

    let totalPrice = 0;
    let linenCost = 0;
    function addItem(product, qty) {
      if (qty > 0) {
        let item = {
          productId: product._id,
          description: product.name,
          type: product.type,
          size: product.type !== ProductType.CLEAN ? product.size : null,
          unitPrice: Number(product.fetchPrice().price),
          quantity: qty,
        };
        item.totalPrice = item.unitPrice * item.quantity;
        totalPrice += item.totalPrice;
        if (item.type === ProductType.BED_LINEN ||
          item.type === ProductType.BATH_LINEN) {
          linenCost += item.totalPrice;
        }
        order.items.push(item);
      }
    }
    addItem(cleanProduct, 1);
    addItem(kingProduct, qtys.kingQty);
    addItem(queenProduct, qtys.queenQty);
    addItem(singleProduct, qtys.singleQty);
    addItem(bathProduct, qtys.bathQty);
    addItem(towelProduct, qtys.towelsQty);
    addItem(toiletriesProduct, qtys.toiletryQty);

    if (linenCost > 0 && linenCost < settings.public.surchargeThreshold) {
      addItem(surchargeProduct, 1);
    }

    if (timeSlot === TimeSlot.DAY) {
      addItem(timeSlotDiscount, 1);
    }

    // Check and add any discount.
    if (!!discountId) {
      check(discountId, String);
      const discount = Discounts.findOne({_id: discountId, hasExpired: false});

      if (!!Meteor.call('Discounts._validate', discount)) {
        const discountItem = {
          discountId: discount._id,
          description: discount.name,
          type: discount.type,
          value: discount.value,
        };

        discountItem.unitPrice =
          discountItem.totalPrice =
            (discount.type === DiscountType.PERCENTAGE
              ? (discount.value / 100) * totalPrice
              : Math.min(discount.value, totalPrice)) * -1;
        totalPrice += discountItem.totalPrice;
        order.items.push(discountItem);

        if (discount.isMulti) {
          Meteor.users.update(user._id,
            {$addToSet: {usedDiscounts: discount._id}});
        } else {
          Discounts.update(discount._id, {$set: {hasExpired: true}});
        }
      }
    }
    // Calculate total and tax
    order.totalPrice = totalPrice;
    order.tax = totalPrice * 0.1;

    const orderId = Orders.insert(order);

    // setup notification variables
    const fullName = !_.isEmpty(user.profile.fullName)
      ? user.profile.fullName + ' ' : '';
    const displayName = fullName +
      `&lt;<mailto:${user.emails[0].address}|${user.emails[0].address}>&gt;`;
    const displayDate = moment(order.serviceDate)
      .tz('Australia/Sydney')
      .format('ddd DD MMM');
    const controlUrl = settings.controlHostname + 'bookings?details=' + orderId;
    const displayTimeSlot = Meteor.call('Order.timeSlotString', order.timeSlot);

    const notifications = (user.profile && user.profile.notifications) || DEFAULT_NOTIFICATIONS;

    if (notifications.newBooking) {
      // send a confirmation email to the customer.
      Emailer.send('79676',
        user.emails[0].address,
        `New Booking - ${nickname}`, {
          orderUrl: Meteor.absoluteUrl('?booking=' + orderId, {secure: true}),
          nickname,
          address: `${street}, ${suburb} ${postcode}`,
          serviceDate: displayDate,
          timeSlot: displayTimeSlot,
        });
    }

    // send notification to slack
    if (settings.slack.newBooking) {

      //Do in another "thread" so that this does not cause errors if it fails
      setTimeout(() => {
        const json = {
          username: 'Kayla',
          icon_url: 'https://kayla.com.au/images/logo_bed.png',
          attachments: [
            {
              fallback: `New Booking: ${displayName}, ${suburb}` +
                ` - ${displayDate} ${controlUrl}`,
              title: 'New Booking',
              text: `${displayName}\n${suburb}\n` +
                `${displayDate} ${displayTimeSlot}\n<${controlUrl}|View booking>`,
              color: '#5193CF',
            },
          ],
        };
        HTTP.call('POST', settings.slack.webHook, {
          data: json,
        });
      }, 100);
    }

    order._id = orderId;

    Meteor.call('Order.tookanSync', order._id);
    return order;
  },

  'Order.cancelNotification'(order) {
    const user = Meteor.users.findOne({_id: this.userId});
    const property = order.fetchProperty();

    // Force running async
    setTimeout(() => {

      const notifications = (user.profile && user.profile.notifications) || DEFAULT_NOTIFICATIONS;
      if (notifications.canceledBooking) {
        // Customer notification
        Emailer.send('85053', user.emails[0].address,
          `Booking Cancelled - ${property.nickname}`, {
            orderId: order._id,
            nickname: property.nickname,
            serviceDate: moment(order.serviceDate)
              .tz('Australia/Sydney')
              .format('Do MMMM, YYYY'),
          });
      }

      if (!!order.event) {
        let rtn = Calendarer.removeEvent(order.event.id);
        if (!rtn.error) {
          Orders.update(order._id,
            {
              $set: {
                housekeeperNotified: false,
                housekeeperResponse: null,
                event: null},
            },
            {validate: false});
        }
      }
    }, 10);

    // TODO: Centralise slack notifications.
    // send notification to slack
    if (settings.slack.bookingCanceled) {
      const fullName = !_.isEmpty(user.profile.fullName)
          ? user.profile.fullName + ' '
          : '';
      const name = `${fullName}` +
        `&lt;<mailto:${user.emails[0].address}|${user.emails[0].address}>&gt;`;
      const sub = property.suburb;
      const date = moment(order.serviceDate)
        .tz('Australia/Sydney')
        .format('ddd DD MMM');
      const ts = Meteor.call('Order.timeSlotString', order.timeSlot);
      const url = `${settings.controlHostname}` +
        `bookings/canceled?details=${order._id}`;

      const json = {
        username: 'Kayla',
        icon_url: 'https://kayla.com.au/images/logo_bed.png',
        attachments: [
          {
            fallback: `Booking Cancelled: ${name}, ${sub} - ${date} ${url}`,
            title: 'Booking Cancelled',
            text: `${name}\n${sub}\n${date} ${ts}\n<${url}|View booking>`,
            color: '#E53935',
          },
        ],
      };

      HTTP.call('POST', settings.slack.webHook, {
        data: json,
      });
    }
  },
  'Order.tookanSync'(_id) {
    check(_id, String);
    Tookaner.syncTask(_id);
  },
  'Order.tookanRemove'(_id) {
    check(_id, String);
    Tookaner.removeTask(_id);
  },
});
