let { Dialog, FlatButton, FontIcon } = mui;

NoAccountDialog = React.createClass({

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
        label="Setup account"
        linkButton={true}
        href="/account"
        primary={true}
        style={styles.link}/>,
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
        title={<Heading title="Setup your account first" />}
        actions={this.getActions()}
        style={styles.root}>
        <Content>
          <Info style={styles.info}>
            <FontIcon className="user icon" style={styles.icon} />
            <div style={styles.copy}>
              <strong>You must have an active account to make a booking</strong>
              <p>
                It will only take two secs and then you can add your booking.
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
