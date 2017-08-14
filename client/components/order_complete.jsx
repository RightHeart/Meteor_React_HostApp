let { Dialog, FlatButton, Mixins } = mui;
let { StylePropable } = Mixins;

OrderComplete = React.createClass({

  propTypes: {
    orderDetails: React.PropTypes.object,
    onAddAnother: React.PropTypes.func,
    onFinish: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      onAddAnother: () => {},
      onFinish: () => {},
    };
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
        width: '85%',
      },
      body: {
        textAlign: 'center',
      },
      colored: {
        marginTop: 20,
        color: palette.primary1Color,
        fontSize: 24,
      },
      icon: {
        marginTop: 20,
      },
    };
  },

  getAction() {
    return [
      <FlatButton
        key={1}
        label="Add Another Booking"
        primary={true}
        onTouchTap={this._handleAddAnother} />,
      <FlatButton
        key={2}
        label="I'm done for now"
        onTouchTap={this._handleFinish} />,
    ];
  },

  render() {
    const styles = this.getStyles();
    let { serviceDate, timeSlot, nickname,
        street, suburb, postcode } = this.props.orderDetails;
    return (
      <Dialog
        ref="dialog"
        modal={true}
        actions={this.getAction()}
        onShow={this.props.onShow}
        onDismiss={this.props.onDismiss}
        contentStyle={styles.root}
        bodyStyle={styles.body}
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true}>
          <Content>
            <h2>Nice, you're all done...</h2>
            <p>Your booking has been confirmed for</p>
            <div style={styles.icon}>
              <Approval size={80} />
            </div>
            <p style={styles.colored}>{nickname}</p>
            <p>{street}, {suburb} {postcode}</p>
            <p style={styles.colored}>
              <DateLabel date={serviceDate || {}} />
            </p>
            <p>
              <TimeSlotLabel
                timeSlot={timeSlot || ''}
                format="dddd Do MMMM YYYY" />
            </p>
          </Content>
      </Dialog>
    );
  },

  show() {
    this.refs.dialog.show();
  },

  _handleAddAnother() {
    this.refs.dialog.dismiss();
    this.props.onAddAnother();
  },

  _handleFinish() {
    this.refs.dialog.dismiss();
    this.props.onFinish();
  },

});
