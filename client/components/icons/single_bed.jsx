let { PureRenderMixin } = React.addons;
let { SvgIcon } = mui;

SingleBed = React.createClass({

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
        <path fill="#FFD758"
              d="M42,41h-6v-2.237C36,37.52,35.56,37,34.315,37H13.685C12.44,37,
                12,37.52,12,38.763V41H6V25h36V41z" />
        <rect x="6" y="31" fill="#FF8C58" width="36" height="2"></rect>
        <path fill="#5193CF"
              d="M42,31H6V14.621C6,9.351,8.458,7,24,7c15.289,0,18,2.208,
                18,7.621V31z" />
        <path fill="#A8CEF0"
              d="M36,22H12c-0.552,0-1-0.447-1-1v-3c0-0.211,
                0.066-0.416,0.19-0.587C11.321,17.232,14.499,13,24,13 c9.5,0,
                12.679,4.232,12.81,4.413C36.934,17.584,37,17.789,37,18v3C37,
                21.553,36.553,22,36,22z" />
        <path fill="#A9BFD4"
              d="M42,31H6c0,0,0,12,0-1c0-11,12.053-11,18.526-11S42,19,42,30C42,
              43,42,31,42,31z" />
        <g transform="matrix(1,0,0,1,-6,-3.55271e-15)">
          <path
            fill="none"
            strokeWidth="1.5px"
            stroke="rgb(81,147,207)"
            d="M24,35.996L24,45" />
        </g>
        <g transform="matrix(6.12323e-17,-1,1,6.12323e-17,-22.4981,64.4981)">
          <path
            fill="none"
            strokeWidth="1.5px"
            stroke="rgb(81,147,207)"
            d="M24,35.996L24,45"/>
        </g>
        <g transform="matrix(0.479167,0,0,0.479167,22.9219,27.2708)">
          <path
            fill="none"
            strokeWidth="3px"
            strokeLinecap="round"
            stroke="rgb(81,147,207)"
            d="M40,33L10.243,33C10.243,33 8.201,32.988 8.178,31C8.155,29.012 10,
            29 10,29L40,29C40,29 44.01,28.936 44.01,33.051C44.01,37.008 40,
            37 40,37L9,37C9,37 3.966,37.037 4,31C4.034,24.963 10,25 10,25L40,25"
          />
        </g>
        <g transform="matrix(0.398932,0,0,-0.479167,24.0146,51.2292)">
          <path
            fill="none"
            strokeWidth="2.72px"
            strokeLinecap="round"
            stroke="rgb(81,147,207)"
            d="M40,33L10.243,33C10.243,33 8.201,32.988 8.178,31C8.155,29.012 10,
            29 10,29L40,29C40,29 44.01,28.936 44.01,33.051C44.01,37.008 40,
            37 40,37L11.251,37" />
        </g>
      </SvgIcon>
    );
  },

});
