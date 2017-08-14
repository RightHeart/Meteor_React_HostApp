TimeSlotLabel = React.createClass({

  propTypes: {
    timeSlot: React.PropTypes.string.isRequired,
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
      root: {},
    };
  },

  getTimeSlot() {
    let { timeSlot } = this.props;
    if (timeSlot === TimeSlot.AM) return '7:00am - 1:00pm';
    if (timeSlot === TimeSlot.PM) return '1:00pm - 7:00pm';
    if (timeSlot === TimeSlot.WINDOW) return '10:00am - 3:00pm';
    return '7:00am - 7:00pm';
  },

  render() {
    const styles = this.getStyles();

    return (
      <span style={styles.root}>
        {this.getTimeSlot()}
      </span>
    );
  },

});
