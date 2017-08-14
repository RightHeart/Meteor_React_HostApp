ForgotPassword = React.createClass({

  propTypes: {},

  mixins: [],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  componentWillMount() {
    DocHead.setTitle('Forgotten password');
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
        <ForgotPasswordForm />
        <p style={styles.footer}>
          No account? <Link href="/sign-up">Sign up</Link>
        </p>
      </div>
    );
  },

});
