let { IconButton, FontIcon, Styles } = mui;
let { Colors } = Styles;

TextToolbar = React.createClass({

  propTypes: {
    onAction: React.PropTypes.func,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [],

  getDefaultProps() {
    return {
      onAction: () => {},
    };
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    const palette = this.context.muiTheme.palette
      || this.context.muiTheme.rawTheme.palette;
    return {
      root: {
        borderBottom: `1px solid ${palette.borderColor}`,
        marginBottom: 20,
      },
      spacer: {
        display: 'inline-block',
        height: 24,
        borderRight: `1px solid ${palette.borderColor}`,
        marginLeft: 10,
        marginRight: 10,
      },
      primaryColor: palette.primary1Color,
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.root}>
        <IconButton
          onMouseDown={this._handleButtonAction.bind(this, 'bold')}>
          <FontIcon
            className="icon bold"
            color={Colors.grey800}
            hoverColor={styles.primaryColor} />
        </IconButton>
        <IconButton
          onMouseDown={this._handleButtonAction.bind(this, 'italic')}>
          <FontIcon
            className="icon italic"
            color={Colors.grey800}
            hoverColor={styles.primaryColor} />
        </IconButton>
        <IconButton
          onMouseDown={this._handleButtonAction.bind(this, 'underline')}>
          <FontIcon
            className="icon underline"
            color={Colors.grey800}
            hoverColor={styles.primaryColor} />
        </IconButton>
        <div style={styles.spacer}></div>
        <IconButton
          onMouseDown={
            this._handleButtonAction.bind(this, 'insertUnorderedList')}>
          <FontIcon
            className="icon unordered list"
            color={Colors.grey800}
            hoverColor={styles.primaryColor} />
        </IconButton>
        <IconButton
          onMouseDown={
            this._handleButtonAction.bind(this, 'insertOrderedList')}>
          <FontIcon
            className="icon ordered list"
            color={Colors.grey800}
            hoverColor={styles.primaryColor} />
        </IconButton>
      </div>
    );
  },

  _handleButtonAction(action, event) {
    event.preventDefault();
    this.props.onAction(action);
  },

});
