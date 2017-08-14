let { Dialog, FlatButton, FontIcon, Styles } = mui;
let { Colors } = Styles;

PropertyRemove = React.createClass({

  propTypes: {
    property: React.PropTypes.object.isRequired,
  },

  mixins: [],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    return {
      root: {},
      cancelButton: {
        color: Colors.red600,
      },
      info: {
        whiteSpace: 'nowrap',
      },
      icon: {
        color: Colors.red600,
        display: 'inline-block',
        fontSize: 38,
        marginRight: 10,
        verticalAlign: 'middle',
      },
      copy: {
        display: 'inline-block',
        whiteSpace: 'normal',
        verticalAlign: 'middle',
        paddingRight: 48,
      },
    };
  },

  getActions() {
    const styles = this.getStyles();
    return [
      <FlatButton
        key={1}
        label="Remove Property"
        style={styles.cancelButton}
        hoverColor={Colors.red50}
        rippleColor={Colors.red300}
        onTouchTap={this._handleRemoveProperty} />,
      <FlatButton
        key={0}
        label="Close"
        onTouchTap={this._handleClose} />,
    ];
  },

  render() {
    const styles = this.getStyles();
    let { property } = this.props;
    return (
      <Dialog
        ref="dialog"
        title={<Heading title="Remove your property?" />}
        actions={this.getActions()}
        style={styles.root}>
        <Content>
          <Info style={styles.info}>
            <FontIcon className="warning icon" style={styles.icon} />
            <div style={styles.copy}>
              <strong>
                Are you sure you want to remove {property.nickname}?
              </strong>
              <p>
                This will also cancel all upcoming bookings for this property.
              </p>
            </div>
          </Info>
        </Content>
      </Dialog>
    );
  },

  show() {
    this.refs.dialog.show();
  },

  _handleClose() {
    this.refs.dialog.dismiss();
  },

  _handleRemoveProperty() {
    PropertyActions.handlePropertyRemoval(this.props.property._id, err => {
      Notifier.showMessage('Your property has been removed',
        err, err && err.reason);
    });
  },

});
