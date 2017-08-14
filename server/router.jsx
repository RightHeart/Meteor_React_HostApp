let { Error } = Meteor;

let bodyParser = Meteor.npmRequire( 'body-parser');

Picker.middleware( bodyParser.json() );
Picker.middleware( bodyParser.urlencoded( { extended: false } ) );

Picker.route('/invoice/:userId/:loginToken/:orderId',
  function(params, req, res) {
    let { userId, loginToken, orderId } = params;
    const hashToken = Accounts._hashLoginToken(loginToken);

    const user = Meteor.users.find(
      {
        _id: userId,
        'services.resume.loginTokens.hashedToken': hashToken,
      });

    if (user) {
      const order = Orders.findOne({_id: orderId, userId });
      if (order) {
        res.writeHead(200, {
          'Content-type': 'application/pdf',
          'Content-Disposition':
            `attachment; filename=
            ${moment(order.serviceDate)
              .tz('Australia/Sydney').format('YYYYMMDD')}-
              ${order._orderNumber}.pdf`,
        });

        return res.end(PDFer.generateInvoice(order));
      }
      throw new Error(403, 'No order found with _id ' + this.params._id);
    }
    res.end();
  });

Picker.route('/event-notifications', function(params, req, res) {
  Calendarer.sync();
  res.end();
});
