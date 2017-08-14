let { PureRenderMixin } = React.addons;
let { SvgIcon } = mui;

Towels = React.createClass({

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
          <path
            fill="none" strokeWidth="3px"
            stroke="rgb(81,147,207" strokeLinecap="round"
            d="M40,33L10.243,33C10.243,33 8.201,32.988 8.178,31C8.155,29.012 10,
            29 10,29L40,29C40,29 44.01,28.936 44.01,33.051C44.01,37.008 40,
            37 40,37L9,37C9,37 3.966,37.037 4,31C4.034,24.963 10,25 10,25L40,25"
            />
          <g transform="matrix(0.832553,0,0,-1,2.28037,50)">
            <path
              fill="none" strokeWidth="2.72px"
              stroke="rgb(81,147,207" strokeLinecap="round"
              d="M40,33L10.243,33C10.243,33 8.201,32.988 8.178,31C8.155,
            29.012 10,29 10,29L40,29C40,29 44.01,28.936 44.01,33.051C44.01,
            37.008 40,37 40,37L11.251,37" />
          </g>
        </g>
      </SvgIcon>
    );
  },

});
