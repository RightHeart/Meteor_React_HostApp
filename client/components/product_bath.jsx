let { Avatar } = mui;

ProductBath = React.createClass({

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
          <Avatar src="bath_linen.jpg" size={130} style={styles.image}/>
          <Avatar src="bath_linen2.jpg" size={130} style={styles.image}/>
        </div>
        <p>
          Hometime provides bathroom sets which include:
          <ul>
            <li>2 hand towels</li>
            <li>2 face towels</li>
            <li>1 bath mat</li>
          </ul>
        </p>
        <p>
          Add extra sets if required.
        </p>
      </ProductDialog>
    );
  },

  show() {
    this.refs.dialog.show();
  },

});
