let { Paper, FlatButton, FontIcon, Styles, Utils } = mui;
let { Colors  } = Styles;
let { ColorManipulator  } = Utils;

QtyButton = React.createClass({

  propTypes: {
    qty: React.PropTypes.number,
    onChange: React.PropTypes.func,
    small: React.PropTypes.bool,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [],

  getDefaultProps() {
    return {
      qty: 0,
      small: false,
    };
  },

  getInitialState() {
    return {
      qty: this.props.qty,
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  },

  getStyles() {
    const palette = this.context.muiTheme.palette
      || this.context.muiTheme.rawTheme.palette;
    let { small } = this.props;
    return {
      root: {
        width: small ? 111 : 142,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
      },
      button: {
        minWidth: small ? 36 : 44,
        lineHeight: small ? '28px' : '36px',
      },
      icon: {
        verticalAlign: 'middle',
        fontSize: small ? 16 : 20,
      },
      number: {
        borderLeft: `1px solid ${palette.borderColor}`,
        borderRight: `1px solid ${palette.borderColor}`,
        width: small ? 36 : 50,
        height: small ? 28 : 36,
        display: 'inline-block',
        color: palette.primary1Color,
        backgroundColor: Colors.white,
        lineHeight: small ? '28px' : '34px',
        fontWeight: 600,
        fontSize: small ? 14 : 18,
      },
      rippleColor: palette.primary1Color,
      hoverColor: ColorManipulator.fade(palette.primary1Color,  0.08),
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <Paper style={styles.root}>
        <FlatButton style={styles.button}
                    hoverColor={styles.hoverColor}
                    rippleColor={styles.rippleColor}
                    onTouchTap={this._handleQtyChange.bind(this, -1)} >
          <FontIcon style={styles.icon} className="minus icon" />
        </FlatButton>
        <div style={styles.number}>{this.state.qty}</div>
        <FlatButton style={styles.button}
                    hoverColor={styles.hoverColor}
                    rippleColor={styles.rippleColor}
                    onTouchTap={this._handleQtyChange.bind(this, 1)} >
          <FontIcon style={styles.icon} className="plus icon" />
        </FlatButton>
      </Paper>
    );
  },

  _handleQtyChange(amount) {
    let qty = Math.max(this.state.qty + amount, 0);
    this.setState({qty});
    if (this.props.onChange) {
      this.props.onChange(qty);
    }
  },

});
