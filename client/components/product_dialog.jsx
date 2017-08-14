let { Dialog, FlatButton } = mui;

ProductDialog = React.createClass({

  propTypes: {
    product: React.PropTypes.object.isRequired,
    children: React.PropTypes.node,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  componentDidMount() {
    this.refs.dialog.refs.dialogOverlay.allowScrolling = () => {};
  },

  getStyles() {
    const palette = this.context.muiTheme.palette;
    return {
      root: {
        position: 'relative',
        width: '85%',
        maxWidth: 550,
      },
      heading: {
        width: '100%',
        position: 'fixed',
        boxSizing: 'border-box',
        backgroundColor: 'white',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
      },
      body: {
        padding: 0,
      },
      h4: {
        float: 'left',
      },
      price: {
        float: 'right',
        color: palette.primary1Color,
        fontWeight: 600,
      },
      content: {
        marginTop: 57,
        paddingTop: 24,
        paddingBottom: 24,
        textAlign: 'left',
      },
    };
  },

  getFormattedPrice() {
    let { product } = this.props;
    if (product.fetchPrice) {
      return `$${product.fetchPrice().price.toFixed(2)}`;
    }
    return '';
  },

  getActions() {
    return [
      <FlatButton
        key={1}
        label="Close"
        onTouchTap={this.dismiss} />,
    ];
  },

  render() {
    const styles = this.getStyles();
    let { name } = this.props.product;
    return (
      <Dialog
        ref="dialog"
        actions={this.getActions()}
        autoScrollBodyContent={true}
        contentStyle={styles.root}
        bodyStyle={styles.body}
        onDismiss={this.props.onDismiss}
        onShow={this.props.onShow}
        title={
          <Heading style={styles.heading}>
          <h4 style={styles.h4}>
            {name}
          </h4>
          <div style={styles.price}>{this.getFormattedPrice()}</div>
        </Heading>
        } >
        <Content style={styles.content}>
          {this.props.children}
        </Content>
      </Dialog>
    );
  },

  show() {
    this.refs.dialog.show();
  },

  dismiss() {
    this.refs.dialog.dismiss();
  },

});
