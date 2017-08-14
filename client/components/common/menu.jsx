let { Paper, List, ListItem, Styles, Mixins } = mui;
let { Transitions } = Styles;
let { StylePropable } = Mixins;

Menu = React.createClass({

  propTypes: {
    style: React.PropTypes.object,
    items: React.PropTypes.array.isRequired,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {
      open: false,
    };
  },

  componentWillUnmount() {
    this._unmount = true;
  },

  getStyles() {
    return {
      root: {
        transition: Transitions.easeOut(),
        position: 'relative',
        display: 'inline-block',
        maxHeight: 0,
        overflow: 'hidden',
        zIndex: -1,
      },
      rootWhenOpen: {
        maxHeight: 150,
        overflowY: 'auto',
        zIndex: 6,
      },
      overlay: {
        height: '100%',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 5,
      },
    };
  },

  render() {
    const styles = this.getStyles();
    let { open } = this.state;
    let { items } = this.props;
    const rootStyle = this.mergeAndPrefix(
      styles.root, this.props.style,
      open && styles.rootWhenOpen);
    return (
      <div>
        <Paper style={rootStyle}>
          <List>
            {items.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  primaryText={item.text}
                  onTouchTap={this._handleTouchTap.bind(this, item)} />
              );
            })}
          </List>
        </Paper>
        {open &&
        <div style={styles.overlay} onTouchTap={this._handleOverlayTouchTap} />}
      </div>
    );
  },

  show() {
    this.setState({open: true});
  },

  dismiss() {
    this.setState({open: false});
  },

  _handleOverlayTouchTap() {
    this.dismiss();
  },

  _handleTouchTap(item) {
    if (item.onSelected) {
      item.onSelected(item);
    }
    setTimeout(() => {
      if (!this._unmount) this.dismiss();
    }, 300);
  },

});
