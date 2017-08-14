let UserSubs = new SubsManager();

ResetPassword = React.createClass({

  propTypes: {
    token: React.PropTypes.string.isRequired,
  },

  mixins: [ReactMeteorData],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  getMeteorData() {
    let handle = UserSubs.subscribe('Users.getByResetToken', this.props.token);
    return {
      loading: !handle.ready(),
      valid: Meteor.users.find({}).count() !== 0,
    };
  },

  getStyles() {
    return {
      root: {
        maxWidth: 360,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'center',
      },
    };
  },

  render() {
    const styles = this.getStyles();
    let { loading, valid } = this.data;
    return (
      <div style={styles.root}>
        <HometimeLogo />
        <ResetPasswordForm
          loading={loading}
          valid={valid}
          token={this.props.token} />
      </div>
    );
  },

});
