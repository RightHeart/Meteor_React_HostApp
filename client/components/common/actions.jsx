Actions = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
  },

  mixins: [],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    return {
      root: {
        padding: '16px 24px',
        textAlign: 'right',
      },
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.root}>
        {this.props.children}
      </div>
    );
  },

});
