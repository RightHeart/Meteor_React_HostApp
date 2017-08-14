let { Mixins, Utils } = mui;
let { StylePropable } = Mixins;
let { ColorManipulator } = Utils;

GeoSuggestItem = React.createClass({

  propTypes: {
    key: React.PropTypes.string,
    place: React.PropTypes.object.isRequired,
    isActive: React.PropTypes.bool,
    onSelected: React.PropTypes.func,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      isActive: false,
      onSelected: () => {},
    };
  },

  getInitialState() {
    return {
      isHover: false,
    };
  },

  getStyles() {
    const palette = this.context.muiTheme.palette;
    return {
      root: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        cursor: 'pointer',
      },
      rootWhenHover: {
        backgroundColor: ColorManipulator.fade(palette.textColor, 0.1),
      },
      rootWhenActive: {
        color: palette.accent1Color,
      },
      icon: {
        verticalAlign: 'middle',
        marginRight: 5,
      },
      primary1Color: palette.primary1Color,
      accent1Color: palette.accent1Color,
    };
  },

  render() {
    const styles = this.getStyles();
    let { isHover } = this.state;
    let { isActive } = this.props;
    const rootStyle =
      this.mergeAndPrefix(styles.root,
        isHover && styles.rootWhenHover,
        isActive && styles.rootWhenActive);
    return (
      <li
        onMouseDown={this._handleMouseDown}
        onClick={this._handleClick}
        onMouseEnter={this._handleHover.bind(this, true)}
        onMouseLeave={this._handleHover.bind(this, false)}
        style={rootStyle}>
        <Marker
          size={24}
          fill={
            isActive
            ? styles.accent1Color
            : styles.primary1Color}
          style={styles.icon}/>
        <span>{this.props.place.description}</span>
      </li>
    );
  },

  _handleMouseDown(event) {
    event.preventDefault();
    event.stopPropagation();
  },

  _handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelected(this.props.place);
  },

  _handleHover(isHover) {
    this.setState({isHover});
  },

});
