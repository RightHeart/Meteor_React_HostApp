let { PureRenderMixin } = React.addons;
let { SvgIcon } = mui;

QueenBed = React.createClass({

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
              d="M44,23c0,1.657-1.343,3-3,3H7c-1.657,0-3-1.343-3-3V9c0-1.657,
                1.343-3,3-3h34c1.657,0,3,1.343,3,3V23z" />
        <g>
          <path fill="#A8CEF0"
                d="M40,21v-7.353c0-0.256-0.11-0.497-0.303-0.664C39.465,12.78,
                  37.563,11,32.531,11s-6.996,1.78-7.229,1.983 C25.11,13.15,25,
                  13.392,25,13.647V19L40,21z" />
          <path fill="#A8CEF0"
                d="M8,21v-7.353c0-0.256,0.11-0.497,0.303-0.664C8.535,12.78,
                  10.438,11,15.469,11s6.996,1.78,7.229,1.983 C22.89,13.15,23,
                  13.392,23,13.647V19L8,21z" />
        </g>
        <path fill="#FFD758"
              d="M46,42h-6v-2.237C40,38.52,39.56,38,38.315,38H9.685C8.44,38,8,
                38.52,8,39.763V42H2V31h44V42z" />
        <path fill="#A9BFD4"
              d="M46,33H2v-1c0-10.992,3.252-14.895,21.526-14.895C40.959,17.105,
                46,20.446,46,32V33z" />
        <rect x="2" y="32" fill="#FF8C58" width="44" height="2" />
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
