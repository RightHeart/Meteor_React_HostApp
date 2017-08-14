DateLabel = React.createClass({

  propTypes: {
    date: React.PropTypes.object.isRequired,
    format: React.PropTypes.string,
  },

  mixins: [],

  getDefaultProps() {
    return {
      format: 'dddd DD MMMM YYYY',
    };
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    return {
      root: {},
    };
  },

  render() {
    const styles = this.getStyles();
    let { date, format } = this.props;
    return (
      <span style={styles.root}>
        {moment(date).tz('Australia/Sydney').format(format)}
      </span>
    );
  },

});
