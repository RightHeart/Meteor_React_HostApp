let { CircularProgress, RaisedButton, FontIcon, Mixins } = mui;
let { StylePropable } = Mixins;

InvoiceList = React.createClass({

  propTypes: {
    limit: React.PropTypes.number,
    pageCount: React.PropTypes.number,
    ordersList: React.PropTypes.array,
    isLoading: React.PropTypes.bool,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      limit: 0,
      pageCount: 10,
      ordersList: [],
      isLoading: true,
    };
  },

  getInitialState() {
    return {
      ordersList: this.props.ordersList,
      isLoading: this.props.isLoading,
    };
  },

  componentWillReceiveProps(props) {
    this.setState(props);
  },

  getGroups() {
    return _.groupBy(this.state.ordersList, function(order) {
      return moment(order.serviceDate).startOf('month').format('x');
    });
  },

  getStyles() {
    const palette = this.context.muiTheme.palette;
    return {
      root: {},
      loading: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50,
      },
      section: {
        marginTop: 20,
      },
      sectionWhenFirst: {
        marginTop: 40,
      },
      moreButton: {
        display: 'block',
        marginTop: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 88,
      },
      noOrders: {
        marginTop: 50,
        textAlign: 'center',
      },
      icon: {
        color: palette.primary1Color,
        fontSize: 60,
        marginBottom: 40,
      },
      title: {
        fontWeight: 400,
        fontSize: 18,
        marginBottom: 20,
      },
    };
  },

  getLoadMoreButton() {
    const styles = this.getStyles();
    let { ordersList, limit } = this.props;
    if (ordersList.length < limit) {
      return '';
    }

    return (
      <RaisedButton
        label=" more..."
        onClick={this._handleLoadMoreClick}
        style={styles.moreButton} />
    );
  },

  render() {
    const styles = this.getStyles();
    let { isLoading } = this.state;
    const groups = this.getGroups();

    if (this.props.ordersList.length === 0) {
      return (
        <div style={styles.noOrders}>
          <FontIcon className="invoices icon" style={styles.icon} />
          <div style={styles.title}>You have no invoices yet.</div>
          <div>
            Once Hometime has serviced your property,
            you will be able to download invoices here.
          </div>
        </div>
      );
    }

    return (
      <div style={styles.root}>
        {Object.keys(groups).map((month, i) => {
          let heading = moment(new Date(Number(month))).format('MMMM YYYY');
          const isFirst = i === 0;
          return (
            <InvoiceSection
              key={month}
              ordersList={groups[month]}
              heading={heading}
              isFirst={isFirst} />
          );
        })}
        { isLoading
          ? <CircularProgress style={styles.loading} />
          : this.getLoadMoreButton()}
      </div>
    );
  },

  _handleLoadMoreClick() {
    let { limit, pageCount } = this.props;
    const newLimit = limit + pageCount;
    FlowRouter.setParams({limit: newLimit});
  },

});
