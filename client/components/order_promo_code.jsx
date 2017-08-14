let { TextField, FlatButton, CircularProgress } = mui;

OrderPromoCode = React.createClass({

  propTypes: {
    onValidDiscount: React.PropTypes.func,
  },

  mixins: [],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {
      loading: false,
      code: '',
    };
  },

  getStyles() {
    return {
      root: {
        width: '100%',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
      },
      textField: {
        flex: 1,
      },
      loading: {
        verticalAlign: 'bottom',
      },
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.root}>
        <TextField
          fullWidth={true}
          floatingLabelText="Enter promo code"
          onChange={this._textFieldChanged}
          style={styles.textField}
          value={this.state.code} />
        <FlatButton
          label="Add code"
          onTouchTap={this._handleButtonClick} />
        {this.state.loading
          ? <CircularProgress size={0.5} style={styles.loading} />
          : ''}
      </div>
    );
  },

  _textFieldChanged(event) {
    this.setState({code: event.target.value});
  },

  _handleButtonClick() {
    this.setState({loading: true});
    DiscountActions.handleAddingPromoCode(this.state.code, (err, discount) => {
      if (!!discount && this.props.onValidDiscount) {
        this.props.onValidDiscount(discount);
      }
      this.setState({
        code: '',
        loading: false,
      });
    });
  },

});
