let { Toggle } = mui;

Notifications = React.createClass({

  propTypes: {
    notifications: React.PropTypes.object,
  },

  mixins: [],

  getDefaultProps() {
    return {
      notifications: {
        newBooking: true,
        canceledBooking: true,
        housekeeperAssigned: true,
        bookingComplete: true,
      }
    };
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    return {
      root: {},
      toggle: {
      },
      toggleWrapper: {
        paddingTop: 20,
        paddingBottom: 20,
      },
    };
  },

  render() {
    const styles = this.getStyles();
    const { newBooking, canceledBooking, housekeeperAssigned, bookingComplete } = this.props.notifications;

    return (
      <DepthPaper style={styles.root}>
        <Heading title="Notifications" />
        <Content>
          <Info>
            <p>
              Set what email notifications you receive
            </p>
          </Info>
          <Fieldset>
            <div style={styles.toggleWrapper}>
              <Toggle
                onToggle={this._handleToggleChange.bind(this, 'newBooking')}
                style={styles.toggle}
                checked={newBooking}
                label="New booking confirmation"/>
            </div>
            <div style={styles.toggleWrapper}>
              <Toggle
                onToggle={this._handleToggleChange.bind(this, 'canceledBooking')}
                style={styles.toggle}
                checked={canceledBooking}
                label="Canceled booking confirmation"/>
            </div>
            <div style={styles.toggleWrapper}>
              <Toggle
                onToggle={this._handleToggleChange.bind(this, 'housekeeperAssigned')}
                style={styles.toggle}
                checked={housekeeperAssigned}
                label="Housekeeper assigned confirmation"/>
            </div>
            <div style={styles.toggleWrapper}>
              <Toggle
                onToggle={this._handleToggleChange.bind(this, 'bookingComplete')}
                style={styles.toggle}
                checked={bookingComplete}
                label="Booking complete (inc. invoice) confirmation"/>
            </div>
          </Fieldset>
        </Content>
      </DepthPaper>
    );
  },

  _handleToggleChange(key, e, value) {
    UserActions.handleNotificationSetting(key, value, err => {
      if (err) {
        Notifier.showError(err.reason);
      }
    });
  },

});
