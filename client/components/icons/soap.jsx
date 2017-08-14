let { PureRenderMixin } = React.addons;
let { SvgIcon } = mui;

Soap = React.createClass({

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
          <circle fill="#B3E5FC" cx="35" cy="16" r="5"/>
          <circle fill="#B3E5FC" cx="25" cy="11" r="3"/>
          <circle fill="#B3E5FC" cx="16" cy="8" r="2"/>
          <circle fill="#B3E5FC" cx="28" cy="19" r="4"/>
        </g>
        <path fill="#FFD758"
              d="M42,34c0,4.418-3.582,8-8,8H14c-4.418,0-8-3.582-8-8v-7c0-4.418,
                3.582-8,8-8h20c4.418,0,8,3.582,8,8V34z" />
        <ellipse fill="#A8CEF0" cx="24" cy="30.5" rx="13" ry="7"/>
        <rect x="17" y="29" fill="#5193CF" width="14" height="3"/>
      </SvgIcon>
    );
  },

});
