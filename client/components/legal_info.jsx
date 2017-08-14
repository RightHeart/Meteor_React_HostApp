LegalInfo = React.createClass({

  propTypes: {},

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
      content: {
        paddingTop: 14,
        paddingBottom: 24,
      },
      label: {
        fontWeight: 400,
        marginTop: 20,
        marginBottom: 10,
        display: 'block',
      },
      indent: {
        marginLeft: 20,
      },
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <DepthPaper style={styles.root}>
        <Heading title="The boring stuff you need to know" />
        <Content style={styles.content}>
          <p style={styles.indent}>
            <Link href="http://hometime.io/terms-and-conditions/" target="_blank">
              Terms of Use
            </Link>
          </p>
          <p style={styles.indent}>
            <Link href="http://hometime.io/privacy-policy/" target="_blank">
              Privacy Policy
            </Link>
          </p>
        </Content>
      </DepthPaper>
    );
  },

});
