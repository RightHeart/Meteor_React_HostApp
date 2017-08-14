
Account = React.createClass({

  propTypes: {},

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [ReactMeteorData],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  getMeteorData() {
    return {
      user: Meteor.user(),
    };
  },

  getStyles() {
    const palette = this.context.muiTheme.palette;
    return {
      root: {},
      version: {
        marginTop: 30,
        textAlign: 'right',
        color: palette.disabledColor,
      },
    };
  },

  getContent(user) {
    return (
      <div>
        <UserInfo
          name={user && user.profile.fullName}
          email={user && user.emails[0].address}
          phone={user && user.profile.phone}/>
        <ChangePassword />
        <Notifications notifications={user && user.profile.notifications} />
      </div>
    );
  },

  render() {
    const styles = this.getStyles();
    let { user } = this.data;

    return (
      <div style={styles.root}>
        {user && user.profile.guest
          ? <SignUpForm
              action={UserActions.handleConvertGuest}
              showSuccess={true} />
          : this.getContent(user)}
        <div style={styles.version}>{Meteor.settings.public.version}</div>
      </div>
    );
  },

});
