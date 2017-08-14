let { Mixins } = mui;
let { StylePropable } = Mixins;

Info = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  getThemePalette() {
    return this.context.muiTheme.palette
      || this.context.muiTheme.rawTheme.palette;
  },

  getStyles() {
    return {
      root: {
        paddingTop: 20,
        paddingBottom: 20,
        borderBottom: '1px solid ' + this.getThemePalette().borderColor,
      },
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={this.mergeAndPrefix(styles.root, this.props.style)}>
        {this.props.children}
      </div>
    );
  },

});
