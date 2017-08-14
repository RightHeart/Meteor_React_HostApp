let { PureRenderMixin } = React.addons;
let { SvgIcon } = mui;

Checkmark = React.createClass({

  propTypes: {
    size: React.PropTypes.number,
  },

  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      size: 48,
    };
  },

  getStyles() {
    return {
      root: {
        width: 'auto',
        height: this.props.size,
      },
    };
  },

  render() {
    const styles = this.getStyles();
    return (
      <SvgIcon  viewBox="0 0 48 48" style={styles.root}>
        <circle fill="#39B0A4" cx="24" cy="24" r="21"/>
        <polygon fill="#FFFFFF"
                 points="34.6,14.6 21,28.2 15.4,
                  22.6 12.6,25.4 21,33.8 37.4,17.4 "/>
      </SvgIcon>
    );
  },

});
