let { Toggle } = mui;

Premium = React.createClass({

  propTypes: {
    premium: React.PropTypes.bool.isRequired,
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
      toggle: {
      },
      toggleWrapper: {
        paddingTop: 20,
        paddingBottom: 20,
      },
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <DepthPaper style={styles.root}>
        <Heading title="Kayla Black, care beyond housekeeping" />
        <Content>
          <Info>
            <p>
              It's Kayla Housekeeping plus some
              '<em>extra mile</em>' extra features.
            </p>
          </Info>
          <Fieldset>
            <div style={styles.toggleWrapper}>
              <Toggle
                onToggle={this._handleToggleChange}
                style={styles.toggle}
                checked={this.props.premium}
                label="activate Kayla Black"/>
            </div>
          </Fieldset>
        </Content>
      </DepthPaper>
    );
  },

  _handleToggleChange(e, premium) {
    UserActions.handlePremiumFlag(premium, err => {
      Notifier.showMessage(
        premium
          ? 'You\'ve activated Kayla Black.'
          : 'You\'re no longer using Kayla Black.',
        err, err && err.reason);
      IntercomActions.trackEvent(
        premium
          ? 'Activated Kayla Black'
          : 'Removed Kayla Black'
      );
      IntercomActions.update();
    });
  },

});
