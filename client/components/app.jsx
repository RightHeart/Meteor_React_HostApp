let { AppCanvas, Styles, Mixins } = mui;
let { Spacing, Colors, Transitions } = Styles;
let { StylePropable } = Mixins;
let settings = Meteor.settings.public;

let instance = null;
const ThemeManager = new Styles.ThemeManager();
ThemeManager.setTheme(KaylaTheme);

App = React.createClass({

  propTypes: {
    content: React.PropTypes.func,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
    highlightSeed: React.PropTypes.number,
    highlightColor: React.PropTypes.string,
  },

  mixins: [ReactMeteorData, StylePropable],

  statics: {
    getInstance() {
      return instance;
    },
  },

  _seed: 0,
  getChildContext() {

    const theme = ThemeManager.getCurrentTheme();
    return {
      muiTheme: theme,
      highlightColor: theme.palette.primary1Color
    };
  },

  getInitialState() {
    return {
      navOpen: this._isLargeScreen(),
      navSelection: {},
    };
  },

  componentWillMount() {
    instance = this;
  },

  getMeteorData() {
    let user = Meteor.user();
    return {
      orderId: FlowRouter.getQueryParam('booking'),
    };
  },

  getTheme() {
    return ThemeManager.getCurrentTheme();
  },

  getStyles() {
    const theme = this.getTheme();

    return {
      canvas: {
        width: '100%',
      },
      root: {
        paddingTop: Spacing.desktopKeylineIncrement,
      },
      appBar: {
        maxWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.accent1Color,
      },
      appBarRightIcon: {
        marginRight: 0,
      },
      content: {
        width: 'auto',
        padding: Spacing.desktopGutter,
        paddingTop: 0,
        paddingBottom: 100,
        position: 'relative',
        transition: Transitions.easeOut(),
      },
      contentWhenNavOpen: {
        marginLeft: this._isLargeScreen() ? theme.component.leftNav.width : 'inherit',
      },
    };
  },

  render() {
    let styles = this.getStyles();

    const Content = this.props.content;
    return (
      <div style={styles.canvas}>
        <AppCanvas>
          <AppBar
            style={styles.appBar}
            route={ this.state.navSelection.route }
            title={ this.state.navSelection.title }
            onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
            iconElementRight={
                <Link href='/'>
                  <HometimeLogo style={{width: '104px', marginTop: '3px'}} color={Colors.white} />
                </Link>
            }
            iconStyleRight={styles.appBarRightIcon}
            />

          <div style={ styles.root }>
            <PrimaryNav
              ref="primaryNav"
              isOpen={this.state.navOpen}
              onChange={(route, text) => this._handleNavChange(route, text)}
              docked={this._isLargeScreen()}
              isInitiallyOpen={this._isLargeScreen()}
              onNavOpen={() => this.setState({navOpen: true})}
              onNavClose={() => this.setState({navOpen: false})}
            />
            <div style={
              this.mergeAndPrefix(
                styles.content,
                this.state.navOpen && styles.contentWhenNavOpen
              )}>
              <Content route={ this.state.navSelection.route } {...this.props.contentProps} />
            </div>
          </div>
        </AppCanvas>
        <Notifier />
        <OrderView orderId={this.data.orderId} />
        {settings.isTest ? <TestFlag /> : ''}
      </div>
    );
  },

  _isLargeScreen() {
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (windowWidth > 720) {
      return true
    } else {
      return false
    }
  },

  _refreshWindow() {
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (windowWidth <= 360) {
      return true
    } else {
      return false
    }
  },

  _onLeftIconButtonTouchTap() {
    this.setState({navOpen: !this.state.navOpen});
  },

  _handleNavChange(route, title) {
    this.setState({
      navSelection: {route, title},
      // autoclose on small screens
      navOpen: !this._isLargeScreen() ? false : this.state.navOpen
    });
    DocHead.setTitle(title);
  },

});
