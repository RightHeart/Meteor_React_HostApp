let { Mixins } = mui;
let { StylePropable } = Mixins;

Content = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    style: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    return {
      root: {
        paddingLeft: 24,
        paddingRight: 24,
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
