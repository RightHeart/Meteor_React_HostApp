let { AppCanvas, Styles } = mui;

const ThemeManager = new Styles.ThemeManager();
ThemeManager.setTheme(KaylaTheme);

Public = React.createClass({

  propTypes: {
    content: React.PropTypes.func,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
    highlightColor: React.PropTypes.string,
  },

  mixins: [],

  _seed: 0,

  getChildContext() {
    const theme = ThemeManager.getCurrentTheme();

    return {
      muiTheme: theme,
      highlightColor: theme.palette.primary1Color
    };
  },

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    return {
      root: {
        paddingBottom: 100,
      },
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.root}>
        <AppCanvas>
          { this.props.content() }
        </AppCanvas>
        <Notifier />
      </div>
    );
  },

});
