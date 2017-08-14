let { Styles, IconButton } = mui;
let { Colors } = Styles;

OrderTotal = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    total: React.PropTypes.number,
    discount: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [],

  getDefaultProps() {
    return {
      title: '',
      total: 0,
    };
  },

  getInitialState() {
    return {};
  },

  getDiscount() {
    let { discount, total } = this.props;
    if (!!discount) {
      if (discount.type === DiscountType.FIXED) {
        return Math.min(discount.value, total) * -1;
      }
      return ((discount.value / 100) * total) * -1;
    }
    return 0;
  },

  getTotal() {
    let { total } = this.props;
    return (total + this.getDiscount()).toFixed(2);
  },

  getStyles() {
    const palette = this.context.muiTheme.palette;
    return {
      heading: {
        display: 'flex',
        backgroundColor: Colors.white,
        position: 'fixed',
        width: '100%',
        maxWidth: 1000,
        boxShadow: '0px 3px 6px -4px rgba(0, 0, 0, 0.24),' +
        '0px 5px 6px -3px rgba(0, 0, 0, 0.12)',
        zIndex: 9,
        boxSizing: 'border-box',
        alignItems: 'center',
        padding: '5px 0px',
        margin: 'auto',
        left: 0,
        right: 0,
      },
      title: {
        flex: 1,
        minWidth: 0,
        padding: '0px 15px',
      },
      titleH4: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
      total: {
        color: palette.primary1Color,
        fontWeight: 600,
      },
      closeButton: {
        padding: 0,
      },
      closeIcon: {
        fontSize: 40,
        color: palette.disabledColor,
      },
    };
  },

  render() {
    const styles = this.getStyles();
    let { title } = this.props;
    return (
      <Heading style={styles.heading}>
        <div style={styles.title}>
          <h4 style={styles.titleH4}>{title}</h4>
        </div>
        <div style={styles.total}>
          ${this.getTotal()}
        </div>
        <IconButton
          onTouchTap={this._handleCloseClick}
          iconClassName="multiply icon"
          style={styles.closeButton}
          iconStyle={styles.closeIcon} />
      </Heading>
    );
  },

  _handleCloseClick() {
    FlowRouter.setQueryParams({'new-booking': null});
  },

});
