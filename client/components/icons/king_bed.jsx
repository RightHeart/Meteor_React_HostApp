let { PureRenderMixin } = React.addons;
let { SvgIcon } = mui;

KingBed = React.createClass({

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
        <path fill="#5193CF"
              d="M46,21H2v-7.379C2,8.351,8.931,6,24.474,
                6C39.764,6,46,8.208,46,13.621V21z" />
        <rect x="2" y="20" fill="#FF8C58" width="44" height="5" />
        <g>
          <path fill="#A8CEF0"
                d="M42,19.993v-5.353c0-0.256-0.11-0.497-0.303-0.664C41.465,
                13.773,39.448,12,33.391,12 c-6.059,0-7.855,1.773-8.088,
                1.977C25.11,14.144,25,14.385,25,14.641v5.353H42z" />
          <path fill="#A8CEF0"
                d="M23,
                20v-5.353c0-0.256-0.11-0.497-0.303-0.664c
                -0.232-0.203-2.287-1.979-8.345-1.979
                s-7.817,1.776-8.05,1.979C6.11,14.15,6,14.392,
                6,14.647V20H23z" />
        </g>
        <path fill="#FFD758"
              d="M46,42h-6v-2.237C40,38.52,39.56,38,38.315,
              38H9.685C8.44,38,8,38.52,8,39.763V42H2V25h44V42z" />
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
