
Logo = React.createClass({

  propTypes: {
    style: React.PropTypes.object,
    type: React.PropTypes.string,
  },

  contextTypes: {
    highlightColor: React.PropTypes.string,
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      style: {},
    };
  },

  componentWillMount() {
    const { type1, type2, type3, type4, type5, type6 } = LogoTypes;
    const types = [type1, type2, type3, type4, type5, type6];
    this.randomType = types[Math.floor(Math.random() * types.length)];
  },

  shouldComponentUpdate(nextProps, nextState) {
    return FlowRouter.getRouteName() !== nextProps.route;
  },

  render() {
    const { style, type, color } = this.props;
    const { base, highlight } = LogoTypes;
    const logoType = type || this.randomType;
    const { palette } = this.context.muiTheme;

    const baseColor = color || palette.primary1Color;

    return (
      <div style={style}>
        <svg width="100%" height="100%" viewBox="0 0 1710 364">
          <path d={logoType} style={{ fill:baseColor }} />
          <path d={base} style={{ fill:baseColor }} />
          <path d={highlight} style={{
              fill:this.context.highlightColor,
              transition: 'fill 0.25s ease-out',
            }} />
        </svg>
      </div>
    );
  },
});
