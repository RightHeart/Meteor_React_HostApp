SupportPage = React.createClass({

  propTypes: {},

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
      version: {
        marginTop: 30,
        textAlign: 'right',
        color: palette.disabledColor,
      },
    };
  },

  shouldComponentUpdate(nextProps, nextState) {
    return FlowRouter.getRouteName() !== nextProps.route;
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.root}>
        <FrequentlyAskedQuestions />
        <ContactInfo />
        <LegalInfo />
        <div style={styles.version}>{Meteor.settings.public.version}</div>
      </div>
    );
  },

});
