let { PureRenderMixin } = React.addons;
let { SvgIcon, Mixins } = mui;
let { StylePropable } = Mixins;

MasterCard = React.createClass({

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
    const rootStyles = this.mergeAndPrefix(styles.root, this.props.style);
    return (
      <SvgIcon  viewBox="0 0 48 48" style={rootStyles}>
        <path fill="#3F51B5"
              d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,
                1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"/>
        <circle fill="#FFC107" cx="30" cy="24" r="10" />
        <path fill="#FF3D00"
              d="M22.014,30c-0.464-0.617-0.863-1.284-1.176-2h5.325c0.278-0.636,
                0.496-1.304,0.637-2h-6.598 C20.07,25.354,20,24.686,20,
                24h7c0-0.686-0.07-1.354-0.201-2h-6.598c0.142-0.696,0.359-1.364,
                0.637-2h5.325
                c-0.313-0.716-0.711-1.383-1.176-2h-2.973c0.437-0.58,0.93-1.122,
                1.481-1.595C21.747,14.909,19.481,14,17,14 c-5.523,0-10,4.477-10,
                10s4.477,10,10,10c3.269,0,6.162-1.575,7.986-4H22.014z"/>
      </SvgIcon>
    );
  },

});
