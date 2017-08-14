let { Mixins, FontIcon, EnhancedButton, Styles } = mui;
let { StylePropable } = Mixins;
let { Colors } = Styles;

InvoiceRow = React.createClass({

  propTypes: {
    order: React.PropTypes.object.isRequired,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {
      isHovering: false,
      downloadSrc: '',
    };
  },

  getThemePalette() {
    return this.context.muiTheme.palette;
  },

  getStyles() {
    const palette = this.getThemePalette();
    return {
      container: {
        backgroundColor: palette.canvasColor,
      },
      root: {
        width: '100%',
        display: 'block',
        position: 'relative',
        backgroundColor: Colors.white,
        textAlign: 'left',
        padding: 0,
        height: 50,
      },
      content: {
        position: 'relative',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        padding: '17px 24px 16px 22px',
      },
      download: {
        float: 'right',
        display: 'none',
      },
      downloadOnHover: {
        display: 'block',
        marginTop: 12,
        marginRight: 22,
      },
      icon: {
        marginRight: 15,
        verticalAlign: 'text-bottom',
      },
      iframe: {
        width: 0,
        height: 0,
        border: 0,
        display: 'none',
      },
    };
  },

  render() {
    const styles = this.getStyles();
    let { order } = this.props;
    return (
      <div style={styles.container}>
        <EnhancedButton style={styles.root}
             onMouseEnter={this._handleHover.bind(this, true)}
             onMouseLeave={this._handleHover.bind(this, false)}
             onClick={this._handleDownloadClick}>
          <div style={this.mergeAndPrefix(
            styles.download,
            this.state.isHovering && styles.downloadOnHover)}>
            <p>
              <FontIcon
              className={'icon download'}
              style={styles.icon} />
                download invoice
            </p>
          </div>
          <p style={styles.content}>
            <strong>{`$${order.totalPrice.toFixed(2)}`}</strong>
            {` - ${moment(order.serviceDate).format('dddd, Do MMM')}`}
          </p>
        </EnhancedButton>
        <iframe src={this.state.downloadSrc} style={styles.iframe} />
      </div>
    );
  },

  _handleHover(isHovering) {
    this.setState({isHovering});
  },

  _handleDownloadClick() {
    this.setState({downloadSrc: ''});
    const src = `/invoice/${Meteor.userId()}/` +
      `${Accounts._storedLoginToken()}/${this.props.order._id}`;
    setTimeout(
      () => {
        this.setState({downloadSrc: src});
      }, 0);
  },

});
