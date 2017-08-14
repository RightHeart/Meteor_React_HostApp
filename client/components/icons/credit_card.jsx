let { PureRenderMixin } = React.addons;
let { SvgIcon, Mixins } = mui;
let { StylePropable } = Mixins;

CreditCard = React.createClass({

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
        <path fill="#5193CF"
              d="M40,38H8c-2.2,0-4-1.8-4-4V14c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,
                4v20C44,36.2,42.2,38,40,38z" />
        <rect x="4" y="16" fill="#263238" width="40" height="5"/>
      </SvgIcon>
    );
  },

});
