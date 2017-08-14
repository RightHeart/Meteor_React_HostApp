TestFlag = React.createClass({

  propTypes: {},

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
        position: 'fixed',
        bottom: -100,
        right: -100,
        width: 200,
        height: 200,
        zIndex: 900,
        paddingTop: 25,
        fontSize: 24,
        fontWeight: 600,
        transform: 'rotateZ(-45deg)',
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        boxSizing: 'border-box',
      },
    };
  },

  render() {
    const styles = this.getStyles();
    return (
      <div style={styles.root}>
        <div>TEST</div>
      </div>
    );
  },

});
