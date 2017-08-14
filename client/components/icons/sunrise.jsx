let { PureRenderMixin } = React.addons;
let { SvgIcon } = mui;

Sunrise = React.createClass({

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
        <g>
          <rect x="11" y="25" fill="#E6AB6D" width="26" height="13" />
          <polygon fill="#E6AB6D" points="42,38 6,38 24,20" />
        </g>
        <path fill="#FFD758"
              d="M24,27c-6.077,0-11,4.923-11,11h22C35,
                31.923,30.076,27,24,27z" />
        <rect x="3" y="38" fill="#5D5D5D" width="42" height="4" />
        <polygon fill="#5D5D5D"
                 points="26,13 26,18 22,18 22,13 18,13 24,6 30,13" />
      </SvgIcon>
    );
  },

});
