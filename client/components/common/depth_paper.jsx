let { Paper, Styles, Mixins } = mui;
let { Colors } = Styles;
let { StylePropable } = Mixins;

DepthPaper = React.createClass({

  propTypes: {
    style: React.PropTypes.object,
    paperStyle: React.PropTypes.object,
    startDepth: React.PropTypes.number,
    endDepth: React.PropTypes.number,
    children: React.PropTypes.node,
    heading: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),
    headingStyles: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      style: {
      },
      startDepth: 1,
      endDepth: 2,
    };
  },

  getInitialState() {
    return {
      zDepth: this.props.startDepth,
    };
  },

  getStyles() {
    return {
      root: {
        marginTop: 40,
      },
      paper: {
        backgroundColor: Colors.white,
      },
      heading: {
        paddingBottom: 10,
        paddingLeft: 22,
        color: Colors.grey700,
        borderBottom: '1px solid transparent',
        borderTop: '1px solid transparent',
      },
    };
  },

  getHeading() {
    if (this.props.heading) {
      const styles = this.getStyles();
      return (
        <div style={
        this.mergeAndPrefix(styles.heading)}>
          {this.props.heading}
        </div>
      );
    }
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={this.mergeAndPrefix(styles.root, this.props.style)}>
        {this.getHeading()}
        <Paper zDepth={this.state.zDepth}
               onMouseEnter={
                this._handleMouseEnter.bind(this, this.props.endDepth)}
               onMouseLeave={
                this._handleMouseLeave.bind(this, this.props.startDepth)}
               rounded={false}
               style={
                this.mergeAndPrefix(styles.paper, this.props.paperStyle)
                }>
          {this.props.children}
        </Paper>
      </div>
    );
  },

  _handlePaperHover(zDepth) {
    this.setState({ zDepth });
  },

  _handleMouseEnter() {
    this.setState({zDepth: this.props.endDepth});
  },

  _handleMouseLeave() {
    this.setState({zDepth: this.props.startDepth});
  },

});
