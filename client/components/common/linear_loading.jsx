let { LinearProgress, Mixins } = mui;
let { StylePropable } = Mixins;

LinearLoading = React.createClass({

  propTypes: {
    style: React.PropTypes.object,
    mode: React.PropTypes.oneOf(['determinate', 'indeterminate']),
    value: React.PropTypes.number,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      mode: 'indeterminate',
      value: 0,
    };
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    return {
      root: {
        borderRadius: 0,
      },
    };
  },

  render() {
    const styles = this.getStyles();
    let { style, ...other } = this.props;
    const rootStyle = this.mergeAndPrefix(styles.root, style);
    return (
      <LinearProgress style={rootStyle} {...other} />
    );
  },

});
