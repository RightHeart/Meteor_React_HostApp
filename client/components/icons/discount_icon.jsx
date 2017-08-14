let { PureRenderMixin } = React.addons;
let { SvgIcon, Mixins } = mui;
let { StylePropable } = Mixins;

DiscountIcon = React.createClass({

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
        <path
          fill="#FF7280"
          d="M25,7C15.061,7 7,15.061 7,25C7,34.939 15.061,43 25,43C34.939,43 43,
          34.939 43,25C43,15.061 34.939,7 25,7ZM25,9C33.861,9 41,16.139 41,
          25C41,33.861 33.861,41 25,41C16.139,41 9,33.861 9,25C9,16.139 16.139,
          9 25,9ZM27,14L27,16.188C25.4,16.388 22.5,17.788 22.5,21.188C22.5,
          27.588 31.813,24.294 31.813,29.094C31.813,30.694 31.1,32.188 28,
          32.188C24.9,32.188 24,29.8 24,28.5L22,28.5C22.3,32.8 25.3,33.794 27,
          34.094L27,36L29,36L29,34.094C30.5,33.994 34,32.906 34,28.906C34,
          25.606 31.288,24.694 28.688,24.094C26.588,23.594 24.688,23.1 24.688,
          21C24.688,20.1 25.094,18.094 28.094,18.094C30.194,18.094 31.2,
          19.4 31.5,21L33.5,21C32.9,18.8 31.9,16.813 29,16.313L29,14L27,14Z" />
        <rect x="27" y="18.094" width="2" height="14.094" fill="#FF7280" />
        <g transform="matrix(1,0,0,1,2,-0.546875)">
          <rect x="12" y="24.094" width="7" height="2.906" fill="#FF7280" />
        </g>
      </SvgIcon>
    );
  },

});
