let { List, ListItem, Styles, Mixins } = mui;
let { StylePropable } = Mixins;
let { Spacing, Colors } = Styles;

PropertyNav = React.createClass({

  propTypes: {
    propertyId: React.PropTypes.string.isRequired,
    property: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      property: {},
    };
  },

  getInitialState() {
    return {
      route: '',
    };
  },

  componentDidMount() {
    this._handleOnChange();
  },

  componentDidUpdate() {
    this._handleOnChange();
  },

  getStyles() {
    const palette = this.context.muiTheme.palette;
    return {
      root: {
        top: Spacing.desktopKeylineIncrement,
        zIndex: 0,
        boxShadow: 'none',
      },
      list: {
        backgroundColor: palette.canvasColor,
        borderRadius: 0,
        borderLeft: `3px solid ${palette.primary1Color}`,
      },
      listItemWhenSelected: {
        color: palette.primary1Color,
        backgroundColor: Colors.white, //Colors.grey300,
        fontWeight: 'bold',
      },
    };
  },

  getMenuItems() {
    return [
      {route: 'propertyConfiguration', text: 'Configuration' },
      {route: 'propertyInstructions', text: 'Instructions' },
      // {route: 'propertyPhotos', text: 'Photos' },
      {route: 'propertyLocation', text: 'Location' },
    ];
  },

  render() {
    const styles = this.getStyles();
    const items = this.getMenuItems();
    const index = this._getSelectedIndex();

    let content = (
      <List style={styles.list}>
        {items.map((item, i) => {
          let click = this._onChangeRoute.bind(this, item.route);
          const selected = index === i;
          return (
            <ListItem
              key={i}
              primaryText={item.text}
              onClick={click}
              style={
                this.mergeAndPrefix(selected && styles.listItemWhenSelected)
              } />
          );
        })}
      </List>
    );

    return (
      <LeftNav
        isOpen={true}
        ref="propertyNav"
        docked={true}
        openRight={true}
        isInitiallyOpen={true}
        content={content}
        style={styles.root}
        from="property_nav"
        selectedIndex={this._getSelectedIndex()} />
    );
  },

  toggle() {
    this.refs.propertyNav.toggle();
  },

  isOpen() {
    return this.refs.propertyNav.state.open;
  },

  _onChangeRoute(route) {
    let { propertyId } = this.props;
    FlowRouter.go(route, {propertyId});
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
    let { nickname } = this.props.property;
    let { route, name } = this.state;
    const items = this.getMenuItems();
    const index = this._getSelectedIndex();
    const current = items[index];
    if (current.route !== route || name !== nickname) {
      App.getInstance()._handleNavChange(
        current.route,
        current.text + (!!nickname ? ' - ' + nickname : ''));
      this.setState({route: current.route, name: nickname});
    }
  },

});
