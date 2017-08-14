let { Avatar } = mui;

OrderStep = React.createClass({

  propTypes: {
    step: React.PropTypes.number.isRequired,
    text: React.PropTypes.string,
    height: React.PropTypes.number,
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
    const palette = this.context.muiTheme.palette;
    return {
      root: {
        display: 'flex',
        paddingTop: 36,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
        alignItems: 'center',
      },
      number: {
        verticalAlign: 'middle',
        flexShrink: 0,
      },
      subHeading: {
        fontWeight: 400,
        paddingLeft: 20,
      },
    };
  },

  render() {
    const styles = this.getStyles();
    let { step, text } = this.props;
    return (
      <div style={styles.root}>
        <Avatar style={styles.number}>{step}</Avatar>
        <span style={styles.subHeading}>{text}</span>
      </div>
    );
  },

});
