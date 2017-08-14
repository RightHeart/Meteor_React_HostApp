let { Dialog, FlatButton, RaisedButton } = mui;

NoAccessDialog = React.createClass({

  propTypes: {
    propertyId: React.PropTypes.string.isRequired,
    access: React.PropTypes.string,
  },

  mixins: [MarkdownMixin],

  getDefaultProps() {
    return {
      access: '',
    };
  },

  getInitialState() {
    return {};
  },

  getStyles() {
    return {
      root: {},
    };
  },

  getActions() {
    return [
      <RaisedButton
        key={1}
        label="Continue with booking"
        disabled={this.props.access.length === 0}
        onTouchTap={this._handleContinue}
        primary={true} />,
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
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true}
        style={styles.root}>
        <Content>
          <Info style={styles.info}>
            You haven't given Hometime instructions on how to access your property.
            <br/>
            You can edit all you instructions in the <a
              href={`/property/${this.props.propertyId}/instructions`}>
            instructions section</a> or just update your access details below:
          </Info>
          <InstructionAccess
            onUpdate={this._handleUpdate} />
        </Content>
      </Dialog>
    );
  },

  show() {
    this.refs.dialog.show();
  },

  _handleClose() {
    this.refs.dialog && this.refs.dialog.dismiss();
  },

  _handleContinue() {
    this.refs.dialog.dismiss();
    FlowRouter.setQueryParams({'new-booking': this.props.propertyId});
  },

  _handleUpdate(options) {
    Object.keys(options).map(key => {
      options[key] = this.convertToMarkdown(options[key]);
    });
    PropertyActions.handleInstructionsUpdate(
      this.props.propertyId, options, err => {
        Notifier.showMessage(
          'Instructions have been updated',
          err, err && err.reason);
      });
  },

});
