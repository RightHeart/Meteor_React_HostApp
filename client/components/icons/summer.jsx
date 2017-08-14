let { PureRenderMixin } = React.addons;
let { SvgIcon } = mui;

Summer = React.createClass({

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
	        <path fill="#E6AB6D"
                d="M38,38c0,0-9-3-14-3s-14,3-14,3s3-10,3-14s-3-14-3-14s9,3,14,
                3s14-3,14-3s-3,10-3,14S38,38,38,38z"/>
	        <path fill="#E6AB6D"
                d="M43,24c0,0-8.222,4.778-11.222,7.778S24,43,24,
                43s-4.278-7.722-7.778-11.222S5,24,5,24 s8.221-4.777,
                11.222-7.777S24,5,24,5s4.779,8.223,7.778,11.223S43,24,43,24z"/>
        </g>
        <path fill="#FFEB3B"
              d="M14,24c0,5.524,4.477,10,10,10s10-4.476,
              10-10s-4.477-10-10-10S14,18.476,14,24" />
      </SvgIcon>
    );
  },

});
