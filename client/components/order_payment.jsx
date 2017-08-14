
OrderPayment = React.createClass({

  propTypes: {
    cardsList: React.PropTypes.array,
    value: React.PropTypes.string,
    onPaymentSelected: React.PropTypes.func,
  },

  mixins: [],

  getDefaultProps() {
    return {
      cardsList: [],
    };
  },

  getInitialState() {
    return {
    };
  },

  getStyles() {
    return {
      root: {
        paddingBottom: 10,
        overflow: 'hidden',
      },
      icon: {
        paddingLeft: 5,
        marginRight: 15,
        verticalAlign: 'middle',
      },
    };
  },

  getIcon(brand) {
    const styles = this.getStyles();
    switch (brand) {
    case 'Visa':
      return <Visa size={24} style={styles.icon} />;
    case 'MasterCard':
      return <MasterCard size={24} style={styles.icon} />;
    case 'JCB':
      return <JCB size={24} style={styles.icon} />;
    case 'American Express':
      return <Amex size={24} style={styles.icon} />;
    default:
      return <CreditCard size={24} style={styles.icon} />;
    }
  },

  getMenuItems() {
    return this.props.cardsList.map(card => {
      return {
        payload: card._id,
        text:
          <span>
            {this.getIcon(card.brand)}
            {`${card.brand} ending ${card.last4} expires ${card.expMonth}/${card.expYear}`}
          </span>,
      };
    });
  },

  render() {
    const styles = this.getStyles();
    const menu = this.getMenuItems();

    return (
      <div style={styles.root}>
        <SelectField
          floatingLabelText="Select payment method"
          fullWidth={true}
          menuItems={menu}
          value={this.props.value}
          onChange={this._handlePaymentChange}
          />
      </div>
    );
  },

  _handlePaymentChange(e, key, payload) {
    if (this.props.onPaymentSelected) {
      this.props.onPaymentSelected(payload);
    }
  },

});
