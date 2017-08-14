let { PureRenderMixin } = React.addons;
let { SvgIcon, Mixins } = mui;
let { StylePropable } = Mixins;

Amex = React.createClass({

  propTypes: {
    size: React.PropTypes.number,
    style: React.PropTypes.object,
  },

  mixins: [StylePropable, PureRenderMixin],

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
    const rootStyles = this.mergeAndPrefix(styles.root, this.props.style);
    return (
      <SvgIcon  viewBox="0 0 48 48" style={rootStyles}>
        <path fill="#1976D2"
              d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,
                1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"/>
        <g>
          <path fill="#FFFFFF"
                d="M22.255,20l-2.113,4.683L18.039,20h-2.695v6.726L12.341,
                  20h-2.274L7,26.981h1.815l0.671-1.558h3.432 l0.682,
                  1.558h3.465v-5.185l2.299,
                  5.185h1.563l2.351-5.095v5.095H25V20H22.255z M10.135,
                  23.915l1.026-2.44l1.066,2.44H10.135z"/>
          <path fill="#FFFFFF"
                d="M37.883,23.413L41,20.018h-2.217l-1.994,2.164L34.86,
                20H28v6.982h6.635l2.092-2.311L38.767,27h2.21 L37.883,
                23.413z M33.728,
                25.516h-4.011v-1.381h3.838v-1.323h-3.838v-1.308l4.234,
                0.012l1.693,1.897L33.728,25.516z"/>
        </g>
      </SvgIcon>
    );
  },

});
