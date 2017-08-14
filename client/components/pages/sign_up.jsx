SignUp = React.createClass({

  propTypes: {},

  mixins: [],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  componentWillMount() {
    DocHead.setTitle('Sign up');
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
      footer: {
        marginTop: 50,
      },
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.root}>
        <HometimeLogo />
        <SignUpForm
          prefilledEmail={this.props.prefilledEmail}
          action={UserActions.handleRegister}
          showInfo={true}
          buttonFullWidth={true}/>
        <p style={styles.footer}>
          Already have an account? <Link href="/sign-in">Sign in</Link>
        </p>
      </div>
    );
  },

});
