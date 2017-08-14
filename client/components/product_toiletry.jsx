let { Avatar } = mui;

ProductToiletry = React.createClass({

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
          <Avatar src="toiletry.jpg" size={130} style={styles.image}/>
          <Avatar src="biology_logo.jpg" size={130} style={styles.image}/>
        </div>
        <p>
          Hometime offers Australian made products from Biology Smart Skincare.
        </p>
        <p>
          Each toiletry pack for your guests include:
          <ul>
            <li>Shampoo</li>
            <li>Conditioner</li>
            <li>Shower gel</li>
            <li>Body bar</li>
            <li>Body lotion</li>
          </ul>
        </p>
      </ProductDialog>
    );
  },

  show() {
    this.refs.dialog.show();
  },

});
