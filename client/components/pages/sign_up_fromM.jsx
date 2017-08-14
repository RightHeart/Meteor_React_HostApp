SignUpMK = React.createClass({

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
        textAlign: 'center'
      },
      footer: {
        marginTop: 50
      }
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <section>
        <header id="nav" className="navbar">
          <div className="navLeft">
            <a href="/">
              <img className="logoimg" src="/logo.png"/>
            </a>
          </div>
          <div className="navRight">
            <a className="hamburger">
              +61 (02) 8103 4112
            </a>
            <ul className="navList">
              <li className="closeButton"></li>
              <li className="navCall">
                <a className="navLinkFont" href="tel:+61 02 8103 4112">+61 (02) 8103 4112</a>
              </li>
              <li className="navTel">
                <a className="navLinkFont" href="tel:+61 02 8103 4112">Call now</a>
              </li>
            </ul>
          </div>
        </header>
        <div id="newSignUp">
          <div id="newSignUpBanner"></div>
          <div className='banner'>
            <h3 className="bannerText">Getting started with Hometime</h3>
            <div
              className="bannerAfter"
              style={{
              fontFamily: '"Open Sans", Arial, sans-serif',
              fontSize: '1em',
              borderTopColor: '#ff7280'
            }}/>
          </div>
          <div id="stepTracker">
            <ol className="stepList">
              <li className="stepItem">
                <span className="stepItemNum">1</span>
                <p>Create an account</p>
              </li>
              <li className="stepItem active">
                <span className="stepItemNum">2</span>
                <p>Get a quote</p>
              </li>
              <li className="stepItem last">
                <span className="stepItemNum">3</span>
                <p>Make a booking</p>
              </li>
            </ol>
          </div>
          <div style={styles.root}>
            <SignUpForm
              prefilledEmail={this.props.prefilledEmail}
              action={UserActions.handleRegister}
              showInfo={true}
              buttonFullWidth={true}/>
            <p style={styles.footer}>
              Already have an account?
              <Link href="/sign-in">Sign in</Link>
            </p>
          </div>
        </div>
      </section>
    );
  }
});