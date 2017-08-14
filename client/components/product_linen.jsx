let { Avatar } = mui;

ProductLinen = React.createClass({

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
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      },
      image: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 24,
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
        <div style={styles.imagery}>
          <Avatar src="bed_linen.jpg" size={130} style={styles.image}/>
          <Avatar src="bed_linen2.jpg" size={130} style={styles.image}/>
          <Avatar src="bath_linen.jpg" size={130} style={styles.image}/>
        </div>
        <p>
          Hometime provides premium bed linen so you don’t have to use your own.
        </p>
        <p>
          Each set comprise of:
          <ul>
            <li>4 pillowcases</li>
            <li>2 flat sheets</li>
            <li>1 top sheet</li>
            <li>
              4 bath towels
            </li>
          </ul>
        </p>
        <p>
          Check the quantities and add any extras if required.
        </p>
        <p>
          Hometime makes all the beds and will leave any spare
          sets that you have added.
        </p>
        <p>
          Note: A Queen set is perfect for a double bed.
        </p>
      </ProductDialog>
    );
  },

  show() {
    this.refs.dialog.show();
  },

});
