let { RaisedButton, Styles, Mixins } = mui;
let { StylePropable } = Mixins;
let { Transitions } = Styles;

OrderTimeSlot = React.createClass({

  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
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
      timeSlot: null,
    };
  },

  getStyles() {
    const palette = this.context.muiTheme.palette;
    return {
      root: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      container: {
        marginTop: 20,
        marginBottom: 20,
      },
      button: {
        width: 170,
        height: 'auto',
        overflow: 'visible',
        marginLeft: 20,
        marginRight: 20,
      },
      content: {
        border: '4px solid transparent',
        paddingTop: 20,
        paddingBottom: 20,
        transition: Transitions.easeOut(),
      },
      contentWhenSelected: {
        border: `4px solid ${palette.primary1Color}`,
      },
      title: {
        marginBottom: 10,
        fontWeight: 400,
      },
      time: {
        marginTop: 10,
      },
      rippleColor: palette.primary1Color,
      discount: {
        position: 'absolute',
        bottom: 50,
        right: 35,
        height: 30,
        width: 30,
      },
    };
  },

  render() {
    const styles = this.getStyles();
    let { value } = this.props;
    return (
      <div style={styles.root}>
        <div style={styles.container}>
          <CheckedSymbol selected={value === TimeSlot.AM} />
          <RaisedButton
            onTouchTap={this._handleSelection.bind(this, TimeSlot.AM)}
            labelColor={styles.rippleColor}
            style={styles.button}>
            <div style={this.mergeAndPrefix(
              styles.content,
              value === TimeSlot.AM && styles.contentWhenSelected)}>
              <div style={styles.title}>Morning</div>
              <Sunrise />
              <div style={styles.time}>7:00am - 1:00pm</div>
            </div>
          </RaisedButton>
        </div>
        <div style={styles.container}>
          <CheckedSymbol selected={value === TimeSlot.PM} />
          <RaisedButton
            onTouchTap={this._handleSelection.bind(this, TimeSlot.PM)}
            labelColor={styles.rippleColor}
            style={styles.button}>
            <div style={this.mergeAndPrefix(
            styles.content,
            value === TimeSlot.PM && styles.contentWhenSelected)}>
              <div style={styles.title}>Afternoon</div>
              <Sunset />
              <div style={styles.time}>1:00pm - 7.00pm</div>
            </div>
          </RaisedButton>
        </div>
        <div style={styles.container}>
          <CheckedSymbol selected={value === TimeSlot.WINDOW} />
          <RaisedButton
            onTouchTap={this._handleSelection.bind(this, TimeSlot.WINDOW)}
            labelColor={styles.rippleColor}
            style={styles.button}>
            <div style={this.mergeAndPrefix(
            styles.content,
            value === TimeSlot.WINDOW && styles.contentWhenSelected)}>
              <div style={styles.title}>Check in/out window</div>
              <TimeSpan />
              <div style={styles.time}>10.00am - 3.00pm</div>
            </div>
          </RaisedButton>
        </div>
        <div style={styles.container}>
          <CheckedSymbol selected={value === TimeSlot.DAY} />
          <RaisedButton
            onTouchTap={this._handleSelection.bind(this, TimeSlot.DAY)}
            labelColor={styles.rippleColor}
            style={styles.button}>
            <div style={this.mergeAndPrefix(
            styles.content,
            value === TimeSlot.DAY && styles.contentWhenSelected)}>
              <div style={styles.title}>Anytime is good</div>
              <Summer />
              <DiscountIcon style={styles.discount}/>
              <div style={styles.time}>7.00am - 7.00pm</div>
            </div>
          </RaisedButton>
        </div>
      </div>
    );
  },

  _handleSelection(timeSlot) {
    if (this.props.onChange) this.props.onChange(timeSlot);
  },

});
