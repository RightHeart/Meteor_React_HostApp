let { Mixins, Styles, IconButton, Paper, SvgIcons } = mui;
let { Typography } = Styles;
let { StylePropable } = Mixins;
let { NavigationMenu } = SvgIcons;

AppBar = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
    highlightColor: React.PropTypes.string,
  },

  propTypes: {
    onLeftIconButtonTouchTap: React.PropTypes.func,
    onRightIconButtonTouchTap: React.PropTypes.func,
    showMenuIconButton: React.PropTypes.bool,
    style: React.PropTypes.object,
    iconClassNameLeft: React.PropTypes.string,
    iconClassNameRight: React.PropTypes.string,
    iconElementLeft: React.PropTypes.element,
    iconElementRight: React.PropTypes.element,
    iconStyleRight: React.PropTypes.object,
    title: React.PropTypes.node,
    zDepth: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      showMenuIconButton: true,
      title: '',
      zDepth: 1,
    };
  },

  getStyles() {
    let spacing = this.context.muiTheme.spacing
      || this.context.muiTheme.rawTheme.spacing;
    let themeVariables =
      !!this.context.muiTheme.component
        ? this.context.muiTheme.component.appBar
        : this.context.muiTheme.appBar;
    let iconButtonSize =
      !!this.context.muiTheme.component
        ? this.context.muiTheme.component.button.iconButtonSize
        : this.context.muiTheme.button.iconButtonSize;
    let flatButtonSize = 36;
    let styles = {
      root: {
        zIndex: 10,
        width: '100%',
        display: 'block',
        minHeight: themeVariables.height,
        backgroundColor: this.props.backgroundColor || themeVariables.color,
        paddingLeft: spacing.desktopGutter,
        paddingRight: spacing.desktopGutter,
      },
      title: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        margin: 0,
        paddingTop: 0,
        letterSpacing: 0,
        fontSize: 24,
        display: 'inline-block',
        verticalAlign: 'top',
        fontWeight: Typography.fontWeightNormal,
        color: themeVariables.textColor,
        lineHeight: themeVariables.height + 'px',
      },
      mainElement: {
      },
      iconButton: {
        style: {
          marginRight: 8,
          marginLeft: -16,
          display: 'inline-block'
        },
        iconStyle: {
          fill: themeVariables.textColor,
          color: themeVariables.textColor,
        },
      },
      flatButton: {
        color: themeVariables.textColor,
        backgroundColor: 'transparent',
        marginTop: (iconButtonSize - flatButtonSize) / 2 + 2,
      },
    };

    return styles;
  },

  render() {
    let props = this.props;
    let menuElementLeft;
    let menuElementRight;
    let styles = this.getStyles();
    let title = props.title;
    let iconRightStyle = this.mergeAndPrefix({
      display: 'flex',
      flexGrow: '1',
      justifyContent: 'flex-end',
    }, props.iconStyleRight);
    let titleElement;

    if (title) {
      // If the title is a string, wrap in an h1 tag.
      // If not, just use it as a node.
      titleElement = typeof title === 'string' || title instanceof String ?
        <h1 style={this.mergeAndPrefix(styles.title, styles.mainElement)}>{title}</h1> :
        <div style={this.mergeAndPrefix(styles.mainElement)}>{title}</div>;
    }

    if (props.showMenuIconButton) {
      let iconElementLeft = props.iconElementLeft;

      if (iconElementLeft) {
        switch (iconElementLeft.type.displayName) {
          case 'IconButton':
            iconElementLeft = React.cloneElement(iconElementLeft, {
              iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle),
            });
            break;
        }

        menuElementLeft = (
          <div style={styles.iconButton.style}>
            {iconElementLeft}
          </div>
        );
      } else {
        let child = (props.iconClassNameLeft) ? '' : <NavigationMenu style={this.mergeAndPrefix(styles.iconButton.iconStyle)}/>;
        menuElementLeft = (
          <IconButton
            style={this.mergeAndPrefix(styles.iconButton.style)}
            iconStyle={this.mergeAndPrefix(styles.iconButton.iconStyle)}
            iconClassName={props.iconClassNameLeft}
            onTouchTap={this._onLeftIconButtonTouchTap}>
            {child}
          </IconButton>
        );
      }
    }

    if (props.iconElementRight) {
      let iconElementRight = props.iconElementRight;

      switch (iconElementRight.type.displayName) {
        case 'IconButton':
          iconElementRight = React.cloneElement(iconElementRight, {
            iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle),
          });
          break;

        case 'FlatButton':
          iconElementRight = React.cloneElement(iconElementRight, {
            style: this.mergeStyles(styles.flatButton, iconElementRight.props.style),
          });
          break;
      }

      menuElementRight = (
        <div style={iconRightStyle}>
          {iconElementRight}
        </div>
      );
    } else if (props.iconClassNameRight) {
      menuElementRight = (
        <IconButton
          style={iconRightStyle}
          iconStyle={this.mergeAndPrefix(styles.iconButton.iconStyle)}
          iconClassName={props.iconClassNameRight}
          onTouchTap={this._onRightIconButtonTouchTap}>
        </IconButton>
      );
    }

    return (
      <Paper
        rounded={false}
        className={props.className}
        style={this.mergeAndPrefix(styles.root, props.style)}
        zDepth={props.zDepth}>
        {menuElementLeft}
        {titleElement}
        {menuElementRight}
        {props.children}
      </Paper>
    );
  },

  _onLeftIconButtonTouchTap(event) {
    if (this.props.onLeftIconButtonTouchTap) {
      this.props.onLeftIconButtonTouchTap(event);
    }
  },

  _onRightIconButtonTouchTap(event) {
    if (this.props.onRightIconButtonTouchTap) {
      this.props.onRightIconButtonTouchTap(event);
    }
  },

});
