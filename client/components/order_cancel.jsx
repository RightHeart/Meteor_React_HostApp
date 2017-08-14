let { Dialog, FlatButton, FontIcon, Styles } = mui;
let { Colors } = Styles;

OrderCancel = React.createClass({

  propTypes: {
    orderId: React.PropTypes.string.isRequired,
    onOrderCanceled: React.PropTypes.func,
  },

  mixins: [],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    return {
      root: {},
      cancelButton: {
        color: Colors.red600,
      },
      info: {
        whiteSpace: 'nowrap',
      },
      icon: {
        color: Colors.red600,
        display: 'inline-block',
        fontSize: 38,
        marginRight: 10,
        verticalAlign: 'middle',
      },
      copy: {
        display: 'inline-block',
        whiteSpace: 'normal',
        verticalAlign: 'middle',
        paddingRight: 48,
      },
    };
  },

  getCancelActions() {
    const styles = this.getStyles();
    return [
      <FlatButton
        key={1}
        label="Cancel Order"
        style={styles.cancelButton}
        hoverColor={Colors.red50}
        rippleColor={Colors.red300}
        onTouchTap={this._handleCancelOrder} />,
      <FlatButton
        key={0}
        label="Close"
        onTouchTap={this._handleClose} />,
    ];
  },

  render() {
    const styles = this.getStyles();

    return (
      <Dialog
        ref="cancelDialog"
        modal={true}
        title={<Heading title="Cancel your booking?" />}
        actions={this.getCancelActions()} >
        <Content>
          <Info style={styles.info}>
            <FontIcon className="warning icon" style={styles.icon} />
            <div style={styles.copy}>
              <strong>Are you sure you want to cancel this booking?</strong>
              <p>
                Remember, creating a new booking will require 48 hours notice.
              </p>
            </div>
          </Info>
        </Content>
      </Dialog>
    );
  },

  _handleClose() {
    this.refs.cancelDialog.dismiss();
  },

  _handleCancelOrder() {
    OrderActions.handleCancelOrder(this.props.orderId, err => {
      Notifier.showMessage('Your order has been canceled',
      err, 'Sorry, there was an error while canceling your order');
    });
    this._handleClose();
    if (this.props.onOrderCanceled) {
      this.props.onOrderCanceled();
    }
  },

  show() {
    this.refs.cancelDialog.show();
  },

});
