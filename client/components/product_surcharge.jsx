let settings = Meteor.settings.public;

ProductSurcharge = React.createClass({

  propTypes: {
    product: React.PropTypes.object.isRequired,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
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
      imagery: {
        paddingBottom: 24,
      },
      para: {
        marginTop: 10,
      },
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <ProductDialog
        ref="dialog"
        product={this.props.product}
        onDismiss={this.props.onDismiss}
        onShow={this.props.onShow}
        style={styles.root}>
        <p>
          Linen orders under ${settings.surchargeThreshold} incurs
          a delivery surcharge.
        </p>
        <p style={styles.para}>
          Our linen travels far and wide to provide your guest with fresh
          sheets and towels as well as laundering the old. Unfortunately, this
          means there is a minimum spend required to justify our logistics fees.
        </p>
        <p style={styles.para}>
          Fear not. Add another towel or linen set and say bye bye to this
          surcharge.
        </p>
      </ProductDialog>
    );
  },

  show() {
    this.refs.dialog.show();
  },

});
