let { 
  FontIcon, 
  TextField, 
  RaisedButton,
  Mixins 
} = mui;
let { StylePropable } = Mixins;

let validator = new SimpleSchema({
  ccNumber: {
    label: 'Card number',
    type: String,
    custom() {
      if (!PaymentMixin.validateCardNumber(this.value)) {
        return 'invalidCardNumber';
      }
    },
  },
  ccExpiry: {
    label: 'Expiry date',
    type: String,
    custom() {
      if (!PaymentMixin.validateExpiry(this.value)) {
        return 'invalidExpiryDate';
      }
    },
  },
  ccCVC: {
    label: 'Card verification code',
    type: String,
    custom() {
      if (!PaymentMixin.validateCVC(this.value, this.field('ccNumber').value)) {
        return 'invalidCVC';
      }
    },
  },
}).newContext();

AddCreditCard = React.createClass({

  propTypes: {
    style: React.PropTypes.object,
  },

  mixins: [StylePropable, PaymentMixin],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {
      ccNumber: null,
      ccExpiry: null,
      ccCVC: null,
      cardType: '',
      isLoading: false,
    };
  },

  getStyles() {
    return {
      root: {
      },
      icon: {
        paddingTop: 38,
        marginRight: 10,
      },
      info: {
        paddingTop: 20,
        paddingBottom: 0,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      infoTitleContainer: {
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        flex: '1 0 auto',
      },
      infoTitle: {
        paddingLeft: 10,
        paddingRight: 20,
      },
      infoPaymentIcons: {
        height: 30,
        marginBottom: 10,
      },
      ccNumberContainer: {
        display: 'flex',
        marginRight: 20,
      },
      ccExpiryContainer: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      ccExpiryField: {
        display: 'flex',
        flex: '1 1 160px',
        marginRight: 20,
      },
    };
  },

  getErrorMessage(key) {
    return validator.keyErrorMessage(key);
  },

  render() {
    const styles = this.getStyles();
    const rootStyles = this.mergeAndPrefix(styles.root, this.props.style);
    return (
      <DepthPaper style={rootStyles}>
        <Heading title="Add credit card" />
        <Content>
          <Info style={styles.info}>
            <div style={styles.infoTitleContainer}>
              <FontIcon className="icon lock" />
              <span style={styles.infoTitle}>Secure payment by&nbsp;<Link href="https://stripe.com/au" target="_blank">Stripe</Link></span>
            </div>
            <img 
              src="/payment_icons.png"
              alt="payment icons" 
              style={styles.infoPaymentIcons} />
          </Info>
          <Fieldset>
            <div style={styles.ccNumberContainer}>
              <FontIcon 
                className={'icon creditcard ' + this.state.cardType} 
                style={styles.icon} />
              <TextField
                ref="ccNumberTextField"
                hintText="•••• •••• •••• ••••"
                floatingLabelText="Credit card number"
                errorText={this.getErrorMessage('ccNumber')}
                autoComplete="cc-number"
                fullWidth={true}
                disabled={this.state.isLoading}
                value={this.state.ccNumber}
                onKeyPress={this.handleCardNumberKeyPress}
                onKeyDown={this.handleCardNumberKeyDown}
                onKeyUp={this.handleCardNumberKeyUp}
                onPaste={this.handleCardNumberPaste}
                onInput={this.handleCardNumberInput} />
            </div>
            <div style={styles.ccExpiryContainer}>
              <div style={styles.ccExpiryField}>
                <FontIcon className="icon calendar" style={styles.icon} />
                <TextField
                  ref="ccExpiryTextField"
                  hintText="MM / YY"
                  floatingLabelText="Expiry date"
                  errorText={this.getErrorMessage('ccExpiry')}
                  autoComplete="cc-exp"
                  fullWidth={true}
                  disabled={this.state.isLoading}
                  value={this.state.ccExpiry}
                  onKeyPress={this.handleExpiryKeyPress}
                  onKeyDown={this.handleExpiryKeyDown}
                  onInput={this.handleExpiryInput} />
              </div>
              <div style={styles.ccExpiryField}>
                <FontIcon className="icon lock" style={styles.icon} />
                <TextField
                  ref="ccCVCTextField"
                  hintText="•••"
                  floatingLabelText="CVC"
                  errorText={this.getErrorMessage('ccCVC')}
                  autoComplete="off"
                  fullWidth={true}
                  disabled={this.state.isLoading}
                  value={this.state.ccCVC}
                  onKeyPress={this.handleCVCKeyPress}
                  onPaste={this.handleCVCPaste}
                  onInput={this.handleCVCInput} />
              </div>
            </div>
          </Fieldset>
        </Content>
        <Actions>
          <RaisedButton
            ref="addButton"
            label="Add credit card"
            primary={true}
            onClick={this._handleAddClick} />
        </Actions>
        { this.state.isLoading
          ? <LinearLoading />
          : ''}
      </DepthPaper>
    );
  },

  _handleAddClick() {
    let { ccNumber, ccExpiry, ccCVC } = this.state;

    if (validator.validate({ccNumber, ccExpiry, ccCVC})
      && !this.state.isLoading) {
      this.setState({isLoading: true});

      const number = this.getNormalizedCardNumber(ccNumber);
      let { month, year } = this.getExpiryVals(ccExpiry);

      CardActions.addCreditCard({
        number,
        exp_month: month,
        exp_year: year,
        cvc: ccCVC,
      }, (err) => {
        if (err) {
          Notifier.showError(err.reason);
          this.setState({isLoading: false});
        } else {
          Notifier.showMessage('Credit card added');
          this.replaceState(this.getInitialState());
        }
      });
    } else {
      this.forceUpdate();
    }
  },

});
