let { Paper, List, ListItem, ClearFix, Mixins, Styles } = mui;
let { StylePropable } = Mixins;
let { Transitions } = Styles;


DropDownList = React.createClass({


  propTypes: {
    displayMember: React.PropTypes.string,
    valueMember: React.PropTypes.string,
    autoWidth: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    value: React.PropTypes.any,
    valueLink: React.PropTypes.object,
    style: React.PropTypes.object,
    iconStyle: React.PropTypes.object,
    underlineStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      autoWidth: true,
      disabled: false,
      valueMember: 'payload',
      displayMember: 'text',
    };
  },

  getInitialState() {
    return {
      open: false,
      selectedIndex: this._isControlled()
        ? null : (this.props.selectedIndex || 0),
    };
  },

  componentDidMount() {
    if (this.props.autoWidth) {
      this._setWidth();
    }
    if (this.props.hasOwnProperty('selectedIndex')) {
      this._setSelectedIndex(this.props);
    }
    let find = !!window.ReactDOM ? ReactDOM.findDOMNode : React.findDOMNode;
    const node = find(this.refs.list);
    node.scrollTop = 1;
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.autoWidth) this._setWidth();
    if (nextProps.hasOwnProperty('value') ||
      nextProps.hasOwnProperty('valueLink')) {
      return;
    }
    if (nextProps.hasOwnProperty('selectedIndex')) {
      this._setSelectedIndex(nextProps);
    }
  },

  getStyles() {
    const {disabled} = this.props;
    let zIndex = 5; // As AppBar
    let spacing = this.context.muiTheme.spacing
      || this.context.muiTheme.rawTheme.spacing;
    let accentColor =
      this.context.muiTheme.menuItem
        ? this.context.muiTheme.menuItem.selectedTextColor
        : this.context.muiTheme.component.menuItem.selectedTextColor;
    let palette =
      this.context.muiTheme.palette
      || this.context.muiTheme.rawTheme.palette;
    return {
      root: {
        transition: Transitions.easeOut(),
        position: 'relative',
        display: 'inline-block',
        height: spacing.desktopSubheaderHeight,
        fontSize: spacing.desktopDropDownMenuFontSize,
        outline: 'none',
      },
      control: {
        cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'static',
        height: '100%',
      },
      icon: {
        position: 'absolute',
        top: ((spacing.desktopToolbarHeight - 24) / 2),
        right: spacing.desktopGutterLess,
        fill: this.context.muiTheme.dropDownMenu
          ? this.context.muiTheme.dropDownMenu.accentColor
          : this.context.muiTheme.component.dropDownMenu.accentColor,
      },
      label: {
        transition: Transitions.easeOut(),
        lineHeight: spacing.desktopToolbarHeight + 'px',
        position: 'absolute',
        paddingLeft: spacing.desktopGutter,
        top: 0,
        opacity: 1,
        color: disabled
          ? palette.disabledColor
          : palette.textColor,
      },
      rootWhenOpen: {
        opacity: 1,
      },
      labelWhenOpen: {
        opacity: 0,
        top: spacing.desktopToolbarHeight / 2,
      },
      overlay: {
        height: '100%',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: zIndex,
      },
      list: {
        backgroundColor: 'white',
        position: 'absolute',
        overflowX: 'hidden',
        overflowY: 'auto',
        top: -10,
        zIndex: -1,
        width: '100%',
        opacity: 0,
        maxHeight: 0,
        transition: Transitions.easeOut(),
      },
      listWhenOpen: {
        zIndex: zIndex + 1,
        opacity: 1,
        maxHeight: 160,
      },
      listItem: {
        height: 46,
      },
      listItemWhenSelected: {
        color: accentColor,
      },
    };
  },

  getInputNode() {
    let root = this.refs.root;
    let item = this.props.menuItems[this.state.selectedIndex];
    if (item) {
      root.value = item[this.props.displayMember];
    }
    return root;
  },

  render() {
    let _this = this;
    let styles = this.getStyles();
    let selectedIndex = this._isControlled() ? null : this.state.selectedIndex;
    let displayValue = '';
    if (!selectedIndex)  {
      if (this.props.valueMember && this._isControlled()) {
        let value = this.props.hasOwnProperty('value')
          ? this.props.value
          : this.props.valueLink.value;
        if (value) {
          for (let i = 0; i < this.props.menuItems.length; i++) {
            if (this.props.menuItems[i][this.props.valueMember] === value) {
              selectedIndex = i;
            }
          }
        }
      }
    }

    let selectedItem = this.props.menuItems[selectedIndex];
    if (selectedItem) {
      displayValue = selectedItem[this.props.displayMember];
    }

    let menuItems = this.props.menuItems.map((item) => {
      item.text = item[_this.props.displayMember];
      item.payload = item[_this.props.valueMember];
      return item;
    });

    return (
      <div
        ref="root"
        onKeyDown={this._onKeyDown}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        style={this.mergeAndPrefix(
          styles.root,
          this.state.open && styles.rootWhenOpen,
          this.props.style)} >

        <ClearFix
          style={this.mergeAndPrefix(styles.control)}
          onTouchTap={this._onControlClick}>
          <div style={this.mergeAndPrefix(styles.label,
            this.state.open && styles.labelWhenOpen, this.props.labelStyle)}>
            {displayValue}
          </div>
          <DropDownArrow style={this.mergeAndPrefix(styles.icon,
            this.props.iconStyle)}/>
          <div style={this.mergeAndPrefix(styles.underline,
            this.props.underlineStyle)}/>
        </ClearFix>

        <Paper
          ref="list"
          zDepth={2}
          style={this.mergeAndPrefix(
          styles.list,
          this.state.open && styles.listWhenOpen)} >
          <List style={{backgroundColor: 'white'}}>
            {menuItems.map((item, i) => {
              const click = this._onMenuItemClick.bind(this, i, item.payload);
              const selected = selectedIndex === i;
              return (
                <ListItem
                  key={i}
                  primaryText={item.text}
                  onClick={click}
                  style={
                    this.mergeAndPrefix(styles.listItem,
                    selected && styles.listItemWhenSelected)
                  }/>
              );
            })}
          </List>
        </Paper>
        {this.state.open &&
        <div style={styles.overlay} onTouchTap={this._handleOverlayTouchTap} />}
      </div>
    );
  },

  _setWidth() {
    let find = !!window.ReactDOM ? ReactDOM.findDOMNode : React.findDOMNode;
    let el = find(this);
    let menuItemsDom = find(this.refs.menuItems);
    if (!this.props.style || !this.props.style.hasOwnProperty('width')) {
      el.style.width = 'auto';
      el.style.width = menuItemsDom.offsetWidth + 'px';
    }
  },

  _setSelectedIndex(props) {
    let selectedIndex = props.selectedIndex;
    this.setState({selectedIndex: (selectedIndex > -1) ? selectedIndex : 0});
  },

  _onControlClick() {
    if (!this.props.disabled) {
      let find = !!window.ReactDOM ? ReactDOM.findDOMNode : React.findDOMNode;
      this.setState({ open: !this.state.open });
      const node = find(this.refs.list);
      node.scrollTop = 0;
    }
  },

  // TODO: Key arrow etc events

  _onMenuItemClick(key, payload, e) {
    if (this.props.onChange && this.state.selectedIndex !== key) {
      let selectedItem = this.props.menuItems[key];
      if (selectedItem) {
        e.target.value = selectedItem[this.props.valueMember];
      }

      if (this.props.valueLink) {
        this.props.valueLink.requestChange(e.target.value);
      } else {
        this.props.onChange(e, key, payload);
      }
    }

    this.setState({
      selectedIndex: key,
      value: e.target.value,
      open: false,
    });
    let find = !!window.ReactDOM ? ReactDOM.findDOMNode : React.findDOMNode;
    const node = find(this.refs.list);
    node.scrollTop = 1;
  },

  _handleOverlayTouchTap() {
    this.setState({
      open: false,
    });
    let find = !!window.ReactDOM ? ReactDOM.findDOMNode : React.findDOMNode;
    const node = find(this.refs.list);
    node.scrollTop = 1;
  },

  _isControlled() {
    return this.props.hasOwnProperty('value') ||
      this.props.hasOwnProperty('valueLink');
  },

});
