
let { Mixins } = mui;
let { StylePropable } = Mixins;

Heading = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    children: React.PropTypes.node,
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      title: '',
    };
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
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        padding: '16px 24px',
        borderBottom: '1px solid ' + this.getThemePalette().borderColor,
        fontSize: 18,
        fontWeight: 400,
      },
    };
  },

  getChildContent() {
    const styles = this.getStyles();
    const rootStyles = this.mergeAndPrefix(styles.root, this.props.style);
    return (
      <div style={rootStyles}>
        {this.props.children}
      </div>
    );
  },

  getTitleContent() {
    const styles = this.getStyles();
    const rootStyles = this.mergeAndPrefix(styles.root, this.props.style);
    return (
      <h4 style={rootStyles}>
        {this.props.title}
      </h4>
    );
  },

  render() {
    return this.props.children
      ? this.getChildContent() : this.getTitleContent();
  },
});
