let { SvgIcon, Styles } = mui;
let { Colors } = Styles;
let { TransitionGroup } = React.addons;

FullLogo = React.createClass({

  propTypes: {
    color: React.PropTypes.string,
    size: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      color: Colors.darkBlack,
      size: 50,
    };
  },

  getStyles() {
    return {
      root: {
        height: this.props.size,
        display: 'inline-block',
      },
      logo: {
        width: this.props.size * 0.6,
        height: this.props.size * 0.6,
        stroke: this.props.color,
        strokeWidth: 24,
        fill: 'none',
        verticalAlign: 'super',
      },
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.root}>
        <SvgIcon style={styles.logo} viewBox="0 0 320 276">
          <path d="M12.000,12.000 C12.000,12.000 295.000,12.000 295.000,
          12.000 C295.000,12.000 230.000,178.000 230.000,178.000 C230.000,
          178.000 295.000,264.000 295.000,264.000 C295.000,264.000 12.000,
          264.000 12.000,264.000 C12.000,264.000 12.000,12.000 12.000,
          12.000 Z" id="logo-path" />
        </SvgIcon>
        <TransitionGroup>
         <KaylaAnimation {...this.props} />
        </TransitionGroup>
      </div>
    );
  },
});
