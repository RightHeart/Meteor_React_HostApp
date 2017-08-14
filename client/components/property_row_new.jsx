let { Avatar, ClearFix, FontIcon, EnhancedButton, Mixins, Styles } = mui;
let { StylePropable } = Mixins;
let { Transitions, Colors } = Styles;

PropertyRowNew = React.createClass({

  propTypes: {
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
    };
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    const palette = this.context.muiTheme.palette;
    return {
      root: {
        marginTop: 24,
        position: 'relative',
        width: '100%',
        maxWidth: 175,
        transition: Transitions.easeOut(),
      },
      rootWhenOpen: {
        // transform: 'scale3d(1.05, 1.05, 1)',
      },
      button: {
        width: '100%',
        display: 'block',
        position: 'relative',
        textAlign: 'left',
        padding: 0,
      },
      buttonContainer: {
        display: 'flex',
        padding: 10,
        alignItems: 'center',
        borderBottom: `1px solid ${palette.borderColor}`,
      },
      avatar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        height: 30,
        width: 30,
        border: `1px solid ${palette.borderColor}`,
      },
      avatarIcon: {
        fontSize: 20,
      },
      avatarColor: palette.primary1Color,
      header: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 500,
      },
    };
  },

  render() {
    const styles = this.getStyles();
    return (
      <DepthPaper style={
        this.mergeAndPrefix(styles.root, open && styles.rootWhenOpen)}>
        <EnhancedButton
          style={styles.button}
          onTouchTap={this._handleNewPropertyClick}>
          <Content style={styles.buttonContainer}>
            <Avatar 
              icon={<FontIcon 
                      className="icon plus" 
                      style={styles.avatarIcon} />}
              color={styles.avatarColor}
              backgroundColor={Colors.white}
              size={80}
              style={styles.avatar} />
            <div style={styles.header}>
              New Property
            </div>
          </Content>
        </EnhancedButton>
      </DepthPaper>
    );
  },

  _handleNewPropertyClick() {
    FlowRouter.setQueryParams({'new-property': true});
  },
});
