let { Styles, Mixins } = mui;
let { Transitions } = Styles;
let { StylePropable } = Mixins;

CheckedSymbol = React.createClass({

  propTypes: {
    selected: React.PropTypes.bool,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    return {
      root: {
        position: 'absolute',
        display: 'inline-block',
        zIndex: 8,
        opacity: 0,
        top: -8,
        right: 10,
        transform: 'scale(0)',
        transitionOrigin: '50% 50%',
        transition: Transitions.easeOut('450ms', 'opacity', '0ms') + ', ' +
          Transitions.easeOut('0ms', 'transform', '450ms'),
      },
      rootWhenSelected: {
        opacity: 1,
        transform: 'scale(1)',
        transition: Transitions.easeOut('0ms', 'opacity', '0ms') + ', ' +
          Transitions.easeOut('800ms', 'transform', '0ms'),
      },
    };
  },

  render() {
    const styles = this.getStyles();
    const rootStyle =
      this.mergeAndPrefix(styles.root,
        this.props.selected && styles.rootWhenSelected);
    return (
      <div style={rootStyle}>
        <Checkmark size={24} />
      </div>
    );
  },

});
