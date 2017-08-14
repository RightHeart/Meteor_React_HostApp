let { Paper, IconButton } = mui;

OrderItem = React.createClass({

  propTypes: {
    product: React.PropTypes.object.isRequired,
    icon: React.PropTypes.element,
    qty: React.PropTypes.number,
    onQtyChange: React.PropTypes.func,
    helpDialogType: React.PropTypes.func,
    onHelpDialogDismiss: React.PropTypes.func,
    onHelpDialogShow: React.PropTypes.func,
    isNew: React.PropTypes.bool,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [],

  getDefaultProps() {
    return {
      qty: 0,
      isNew: false,
    };
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    const palette = this.context.muiTheme.palette;
    return {
      root: {
        backgroundColor: palette.canvasColor,
        width: 170,
        display: 'inline-block',
        paddingTop: 20,
        paddingBottom: 20,
        textAlign: 'center',
        position: 'relative',
      },
      name: {
        fontWeight: 400,
        marginBottom: 10,
      },
      icon: {
        width: 70,
        height: 70,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: 10,
        marginBottom: 20,
      },
      helpButton: {
        position: 'absolute',
        right: 10,
        bottom: 57,
      },
      helpButtonIcon: {
        color: palette.borderColor,
      },
    };
  },

  getHelpDialog() {
    let { helpDialogType } = this.props;
    if (helpDialogType) {
      return React.createElement(helpDialogType, {
        ref: 'dialog',
        product: this.props.product,
        onDismiss: this.props.onHelpDialogDismiss,
        onShow: this.props.onHelpDialogShow,
      });
    }
  },

  render() {
    const styles = this.getStyles();
    let { name } = this.props.product;
    let newIcon = null;
    if (this.props.isNew) {
      newIcon = (
        <NewIcon
          size={24}
          style={{verticalAlign: 'middle'}} />
      );
    }
    return (
      <div style={styles.root}>
        <div style={styles.name}>
          {name} {newIcon}
        </div>
        <Paper style={styles.icon} circle={true}>
          {this.props.icon}
        </Paper>
        <IconButton
          onTouchTap={this._handleHelpClick}
          style={styles.helpButton}
          iconStyle={styles.helpButtonIcon}
          iconClassName="icon help_filled" />
        <QtyButton
          qty={this.props.qty}
          onChange={this.props.onQtyChange} />
        {this.getHelpDialog()}
      </div>
    );
  },

  _handleHelpClick() {
    if (this.refs.dialog) {
      this.refs.dialog.show();
    }
  },

});
