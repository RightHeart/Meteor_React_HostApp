Fieldset = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    const palette = this.context.muiTheme.palette
      || this.context.muiTheme.rawTheme.palette;
    return {
      root: {
        paddingBottom: 30,
        border: 'none',
        borderBottom: '1px solid ' + palette.borderColor,
      },
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <fieldset style={styles.root}>
        {this.props.children}
      </fieldset>
    );
  },

});
