let { PureRenderMixin } = React.addons;
let { SvgIcon } = mui;

TimeSpan = React.createClass({

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
        <path fill="#19A698"
              d="M44,24c0,11.046-8.954,20-20,20S4,
                35.046,4,24S12.954,4,24,4S44,12.954,44,24" />
        <path fill="#FFFFFF"
              d="M40,24c0,8.837-7.163,16-16,16S8,32.837,8,
                24S15.163,8,24,8S40,15.163,40,24" />
        <path fill="#6DC0B7"
              d="M24,22.883V4C16.529,4,10.033,
                8.107,6.601,14.177L24,22.883z" />
        <g>
          <polygon fill="#5D5D5D"
            points="14.167,17.918 13.271,19.704 23.552,24.894 24.448,23.106" />
          <polygon fill="#5D5D5D"
            points="31.834,22.668 31.098,20.449 23.632,22.891 24.369,25.108" />
          <path fill="#5D5D5D"
            d="M24.896,22.212c0.988,0.495,1.387,
              1.696,0.892,2.685c-0.495,0.987-1.696,1.387-2.684,0.892
              c-0.988-0.495-1.387-1.696-0.892-2.685C22.708,
              22.115,23.908,21.716,24.896,22.212" />
        </g>
        <path fill="#39B0A4"
              d="M24.448,23.106c0.493,0.246,0.692,0.848,0.446,
                1.342c-0.248,0.492-0.849,0.692-1.342,0.445
                c-0.494-0.247-0.693-0.849-0.446-1.342C23.354,
                23.059,23.955,22.858,24.448,23.106" />
      </SvgIcon>
    );
  },

});
