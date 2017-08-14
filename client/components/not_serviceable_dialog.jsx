let { Dialog, FlatButton, FontIcon } = mui;

NotServiceableDialog = React.createClass({

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    const palette = this.context.muiTheme.palette;
    return {
      root: {},
      link: {
        verticalAlign: 'bottom',
      },
      info: {
        whiteSpace: 'nowrap',
      },
      icon: {
        display: 'inline-block',
        fontSize: 38,
        marginRight: 10,
        verticalAlign: 'middle',
        color: palette.errorColor,
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
    return [
      <FlatButton
        key={0}
        label="Close"
        onTouchTap={this._handleClose} />,
    ];
  },

  render() {
    const styles = this.getStyles();

    return (
      <Dialog
        ref="dialog"
        title={<Heading title="Aw, snap!" />}
        actions={this.getActions()}
        style={styles.root}>
        <Content>
          <Info style={styles.info}>
            <FontIcon className="location icon" style={styles.icon} />
            <div style={styles.copy}>
              <strong>Hometime is not in this area...yet?</strong>
              <p>
                So sorry, Hometime is not in this suburb at the moment.
                Hometime will let you know when this area becomes serviceable.
              </p>
            </div>
          </Info>
        </Content>
      </Dialog>
    );
  },

  _handleClose() {
    this.refs.dialog && this.refs.dialog.dismiss();
  },

  show() {
    this.refs.dialog.show();
  },

});
