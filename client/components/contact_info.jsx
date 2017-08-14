ContactInfo = React.createClass({

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
        paddingBottom: 44,
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
        <Heading title="Ways to contact Kayla" />
        <Content style={styles.content}>
          <label style={styles.label}>Email</label>
          <p style={styles.indent}>
            Enquires - <Link
              href="mailto:sayhi@kayla.com.au" target="_blank">
              sayhi@kayla.com.au
            </Link>
          </p>
          <p style={styles.indent}>
            Support - <Link
              href="mailto:support@kayla.com.au" target="_blank">
              support@kayla.com.au
            </Link>
          </p>
          <label style={styles.label}>Telephone</label>
          <p style={styles.indent}>
            Mon-Fri 9am to 5pm - <Link
              href="tel:+61282946060">
              +61 (02) 8294 6060
            </Link>
          </p>
          <label style={styles.label}>Social</label>
          <p style={styles.indent}>
            Blog - <Link
            href="https://blog.kayla.com.au" target="_blank">
            Kayla's Blog
          </Link>
          </p>
          <p style={styles.indent}>
            Facebook - <Link
              href="https://www.facebook.com/KaylaAustralia/" target="_blank">
              Kayla's Facebook Page
            </Link>
          </p>
          <p style={styles.indent}>
            Google Plus - <Link
              href="https://plus.google.com/+KaylaAu" target="_blank">
              Kayla's Google+ Page
            </Link>
          </p>
          <label style={styles.label}>Address</label>
          <p style={styles.indent}>
            608 Harris Street,<br/>
            Ultimo 2007, NSW<br/>
            Australia<br/>
          </p>
        </Content>
      </DepthPaper>
    );
  },

});
