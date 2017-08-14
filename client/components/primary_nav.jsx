let { List, ListItem, FontIcon, Styles, Mixins } = mui;
let { StylePropable } = Mixins;
let { Spacing, Colors } = Styles;

PrimaryNav = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
    highlightColor: React.PropTypes.string,
  },

  mixins: [StylePropable],

  getInitialState() {
    return {
      route: '',
    };
  },

  componentDidMount() {
    this._handleOnChange();
  },

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isOpen != nextProps.isOpen) return true;
    return FlowRouter.getRouteName() !== nextState.route;
  },

  componentDidUpdate() {
    this._handleOnChange();
  },

  getThemePalette() {
    return this.context.muiTheme.palette;
  },

  getStyles() {
    return {
      root: {
        top: Spacing.desktopKeylineIncrement,
        zIndex: 9,
        boxShadow: 'none',
        backgroundColor: this.getThemePalette().canvasColor,
        height: '100%'
      },
      list: {
        borderRadius: 0,
        height: '100%'
      },
      listItemWhenSelected: {
        color: this.context.highlightColor,
        // backgroundColor: Colors.grey300,
        fontWeight: 'bold',
      },
    };
  },

  getMenuItems() {
    return [
      {route: 'properties', text: 'Properties', icon: 'home' },
      {route: 'invoices', match: 'invoices*',
        text: 'Invoices', icon: 'invoices' },
      {route: 'payment', text: 'Payment', icon: 'creditcard' },
      {route: 'account', text: 'Account', icon: 'user' },
      {route: 'http://help.hometime.io/', text: 'Support', icon: 'help' },
    ];
  },

  render() {
    const styles = this.getStyles();
    const items = this.getMenuItems();
    const index = this._getSelectedIndex();

    const { state } = this.props;

    let content = (
      <List style={styles.list}>
        {items.map((item, i) => {
          let click = this._onChangeRoute.bind(this, item.route);
          const iconClass = 'icon ' + item.icon;
          const selected = index === i;
          return (
            <ListItem
              key={i}
              primaryText={item.text}
              onTouchTap={click}
              leftIcon={<FontIcon className={iconClass} />}
              style={
                this.mergeAndPrefix(selected && styles.listItemWhenSelected)
              } />
          );
        })}
        <ListItem
          key={'sign-out'}
          primaryText="Sign out"
          leftIcon={<FontIcon className="icon exit" />}
          onTouchTap={this._handleSignOut}
          />
      </List>
    );

    return (
      <LeftNav
        isOpen={this.props.isOpen}
        ref="primaryNav"
        docked={this.props.docked}
        isInitiallyOpen={this.props.isInitiallyOpen}
        content={content}
        style={styles.root}
        selectedIndex={this._getSelectedIndex()}
        onNavOpen={() => this.props.onNavOpen()}
        onNavClose={() => this.props.onNavClose()}
      />
    );
  },

  _onChangeRoute(route) {
    if(route.indexOf('http') === 0) {
      window.location = route
    } else {
      FlowRouter.go(route);
    }
  },

  _handleSignOut() {
    UserActions.handleSignOut();
  },

  _getSelectedIndex() {
    let currentItem;
    let menuItems = this.getMenuItems();
    for (let i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      const regex = new RegExp(`^${currentItem.match || currentItem.route}$`);
      if (regex.test(FlowRouter.getRouteName())) {
        return i;
      }
    }
  },

  _handleOnChange() {
    if (this.props.onChange) {
      const items = this.getMenuItems();
      const index = this._getSelectedIndex();
      const current = items[index];
      if (!!current && current.route !== this.state.route) {
        this.props.onChange(current.route, current.text);
        this.setState({route: current.route});
      } else {
        this.setState({route: FlowRouter.getRouteName()});
      }
    }
  },

});
