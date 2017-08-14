let { PureRenderMixin } = React.addons;
let { SvgIcon, Mixins } = mui;
let { StylePropable } = Mixins;

Marker = React.createClass({

  propTypes: {
    size: React.PropTypes.number,
    fill: React.PropTypes.string,
    style: React.PropTypes.object,
  },

  mixins: [StylePropable, PureRenderMixin],

  getDefaultProps() {
    return {
      size: 48,
      fill: '#000000',
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
      <SvgIcon viewBox="0 0 48 48" style={rootStyles}>
        <path
          fill={this.props.fill}
          d="M24,4c-7.732,0-14,6.269-14,14c0,7.732,14,26,14,26s14-18.268,
            14-26C38,10.269,31.732,4,24,4z M24,25 c-3.866,0-7-3.134-7-7s3.134-7,
            7-7s7,3.134,7,7S27.866,25,24,25z" />
      </SvgIcon>
    );
  },

});
