FrequentlyAskedQuestions = React.createClass({

  propTypes: {},

  mixins: [],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  getLinks() {
    return {
      bookings: [
        {
          title: 'How do I make a booking?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/207037337-How-do-I-make-a-booking-',
        },
        {
          title: 'I’ve just made a booking, now what?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/207037397-I-ve-just-made-a-booking-now-what-',
        },
        {
          title: 'What happens if I cancel my booking?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/207037417-What-happens-if-I-cancel-my-booking-',
        },
        {
          title: 'Am I notified once my turnover has been completed?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/207037427-Am-I-notified-once-my-turnover-has-been-completed-',
        },
        {
          title: 'What if I have specific instructions?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/206332818-What-if-I-have-specific-instructions-',
        },
        {
          title: 'I’m currently away on holiday, can I use Kayla?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/207037437--I-m-currently-away-on-holiday-can-I-use-Kayla-',
        },
      ],
      timing: [
        {
          title: 'What is Kayla’s booking time frame?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/207037467-What-is-Kayla-s-booking-time-frame-',
        },
        {
          title: 'I have guests leaving and arriving on the same day?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/206333048-I-have-guests-leaving-and-arriving-on-the-same-day-',
        },
        {
          title: 'My guests have asked for an early check-in/late check-out, are you able to accommodate this?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/206333058--My-guests-have-asked-for-an-early-check-in-late-check-out-are-you-able-to-accommodate-this-',
        },
        {
          title: 'What happens if more time is required for my booking?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/206333068-What-happens-if-more-time-is-required-for-my-booking-',
        },
      ],
      housekeeping: [
        {
          title: 'Who are your housekeepers?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/207037497-Who-are-your-housekeepers-',
        },
        {
          title: 'Cleaning equipment? Does Kayla supply this?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/207037507-Cleaning-equipment-Does-Kayla-supply-this-',
        },
        {
          title: 'What do I need to do to prepare my space for Kayla?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/207037517-What-do-I-need-to-do-to-prepare-my-space-for-Kayla-',
        },
        {
          title: 'How will I know if my house is ready for my guests?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/207037527-How-will-I-know-if-my-house-is-ready-for-my-guests-',
        },
        {
          title: 'What does Kayla not do?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/207037537-What-does-Kayla-not-do-',
        },
        {
          title: 'What do I do if Kayla’s housekeeper has not arrived?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/206333178-What-do-I-do-if-Kayla-s-housekeeper-has-not-arrived-',
        },
      ],
      linen: [
        {
          title: 'How long can I keep linen?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/206384658-How-long-can-I-keep-linen-',
        },
        {
          title: 'I’ve got my own linen, why should I use Kayla’s?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/206333218-I-ve-got-my-own-linen-why-should-I-use-Kayla-s-',
        },
        {
          title: 'Where’s the doona cover?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/207037577-Where-s-the-doona-cover-',
        },
        {
          title: 'I have Kayla’s linen at my property, now what?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/206333228-I-have-Kayla-s-linen-at-my-property-now-what-',
        },
        {
          title: 'What if my guests require extra bed linen and towels?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/206333238-What-if-my-guests-require-extra-bed-linen-and-towels-',
        },
        {
          title: 'Record keeping? Does Kayla send invoices?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/207037737-Record-keeping-Does-Kayla-send-invoices-',
        },
      ],
      access: [
        {
          title: 'Should I be home when Kayla arrives?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/207037697-Should-I-be-home-when-Kayla-arrives-',
        },
        {
          title: 'What happens if Kayla is unable to access the property?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/207037707-What-happens-if-Kayla-is-unable-to-access-the-property-',
        },
        {
          title: 'How does Kayla get into the property, do you manage keys?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/206333258-How-does-Kayla-get-into-the-property-do-you-manage-keys-',
        },
      ],
      payment: [
        {
          title: 'When do I get charged for Kayla’s service?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/207037717-When-do-I-get-charged-for-Kayla-s-service-',
        },
        {
          title: 'Payment methods? Can I pay cash?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/206333278-Payment-methods-Can-I-pay-cash-',
        },
        {
          title: 'Is the payment method secure?',
          href: 'https://kayla.zendesk.com/hc/en-us/articles/206333788-Is-the-payment-method-secure-',
        },
      ],
    };
  },

  getLinkList(list) {
    return list.map((link, i) => {
      return (
        <div key={i}>
          <Link href={link.href} target="_blank">{link.title}</Link>
        </div>
      );
    });
  },

  getStyles() {
    return {
      root: {},
      content: {
        paddingBottom: 24,
      },
      section: {
        marginTop: 24,
        paddingLeft: 15,
        verticalAlign: 'top',
        boxSizing: 'border-box',
      },
      label: {
        fontWeight: 400,
        display: 'inline-block',
        marginBottom: 10,
      },
    };
  },

  render() {
    const styles = this.getStyles();
    const links = this.getLinks();
    return (
      <DepthPaper style={styles.root}>
        <Heading title="Frequently Asked Questions" />
        <Content style={styles.content}>
          <Info>
            Discover and find helpful information about Kayla's services,<br/>
            Kayla's platform and tips and tricks for being a 5 star host.
          </Info>
          <div style={styles.section}>
            <label style={styles.label}>Bookings</label>
            {this.getLinkList(links.bookings)}
          </div>
          <div style={styles.section}>
            <label style={styles.label}>Timing</label>
            {this.getLinkList(links.timing)}
          </div>
          <div style={styles.section}>
            <label style={styles.label}>Housekeeping</label>
            {this.getLinkList(links.housekeeping)}
          </div>
          <div style={styles.section}>
            <label style={styles.label}>Linen and towels</label>
            {this.getLinkList(links.linen)}
          </div>
          <div style={styles.section}>
            <label style={styles.label}>Access</label>
            {this.getLinkList(links.access)}
          </div>
          <div style={styles.section}>
            <label style={styles.label}>Payment</label>
            {this.getLinkList(links.payment)}
          </div>
        </Content>
      </DepthPaper>
    );
  },

});
