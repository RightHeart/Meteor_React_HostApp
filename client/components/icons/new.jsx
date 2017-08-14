let { PureRenderMixin } = React.addons;
let { SvgIcon, Mixins } = mui;
let { StylePropable } = Mixins;

NewIcon = React.createClass({

  propTypes: {
    size: React.PropTypes.number,
    style: React.PropTypes.object,
  },

  mixins: [PureRenderMixin, StylePropable],

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
    let rootStyles = this.mergeAndPrefix(styles, this.props.style);
    return (
      <SvgIcon  viewBox="0 0 48 48" style={rootStyles}>
        <polygon
          fill="#5193CF"
          points="24,3 28.3,7.8 34.5,5.8 35.9,12.1 42.2,13.5 40.2,19.7 45,
          24 40.2,28.3 42.2,34.5 35.9,35.9 34.5,42.2 28.3,40.2 24,45 19.7,
          40.2 13.5,42.2 12.1,35.9 5.8,34.5 7.8,28.3 3,24 7.8,19.7 5.8,
          13.5 12.1,12.1 13.5,5.8 19.7,7.8" />
        <g>
          <path fill="#FFFFFF"
                d="M17.8,29h-2l-3-6.6V29h-2V19h2l3,6.6V19h2V29z" />
          <path fill="#FFFFFF"
                d="M25.3,24.7h-3.1v2.7h3.7V29h-5.7V19h5.7v1.7h-3.7V23h3.1V24.7z"
          />
          <path fill="#FFFFFF"
                d="M34.2,25.3l0.9-6.3h2l-1.8,10h-2l-1.2-5.9L31.1,
                29h-2l-1.8-10h2l0.9,6.3l1.2-6.3h1.7L34.2,25.3z" />
        </g>
      </SvgIcon>
    );
  },

});
