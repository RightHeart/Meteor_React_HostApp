let { Avatar } = mui;

ProductTowels = React.createClass({

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
        </div>
        <p>
          Hometime provides luxury towel sets which include:
          <ul>
            <li>
              4 white bath towels
            </li>
          </ul>
        </p>
        <p>
          Don't forget that you get bath towels included with your bed linen.
          <br/>
          Add extra sets if required.
        </p>
      </ProductDialog>
    );
  },

  show() {
    this.refs.dialog.show();
  },

});
